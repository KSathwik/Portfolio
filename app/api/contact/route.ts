import { NextResponse } from "next/server";

/*
 * The contact form's only server endpoint. It relays a message to my inbox through FormSubmit,
 * so the checks here stop it being used to spam me or anyone else:
 *  - same-site only: the browser's Origin must match this site's host (blocks other sites and
 *    most scripts);
 *  - JSON only, small bodies only, and length limits on every field;
 *  - a per-visitor rate limit (best effort: it lives in this server instance's memory);
 *  - no line breaks or control characters in values that end up in email headers.
 */

const LIMITS = { body: 10_000, name: 100, email: 254, message: 5_000 } as const;
const RATE = { max: 5, windowMs: 10 * 60 * 1000 } as const;

const recent = new Map<string, number[]>();

function rateLimited(key: string) {
  const now = Date.now();
  const hits = (recent.get(key) ?? []).filter((t) => now - t < RATE.windowMs);
  hits.push(now);
  recent.set(key, hits);
  // Keep the map small: forget visitors with no recent requests.
  if (recent.size > 1_000) {
    for (const [k, v] of recent) if (v.every((t) => now - t >= RATE.windowMs)) recent.delete(k);
  }
  return hits.length > RATE.max;
}

/** Collapse whitespace (including line breaks) and drop control characters. */
const oneLine = (s: string) => s.replace(/[\u0000-\u001f\u007f]+/g, " ").replace(/\s+/g, " ").trim();
/** Keep line breaks in the message, drop other control characters. */
const clean = (s: string) => s.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").trim();

const fail = (message: string, status: number) =>
  NextResponse.json({ success: false, message }, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: Request) {
  try {
    // Same-site check: browsers always send Origin on a POST from fetch().
    const origin = request.headers.get("origin");
    const host = request.headers.get("host");
    let originHost = "";
    try {
      originHost = origin ? new URL(origin).host : "";
    } catch {
      originHost = "";
    }
    if (!origin || !host || originHost !== host) {
      return fail("This form only accepts messages sent from this website.", 403);
    }

    if (!(request.headers.get("content-type") ?? "").includes("application/json")) {
      return fail("Unsupported request.", 415);
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";
    if (rateLimited(ip)) {
      return fail("That's a lot of messages in a short time. Please wait a few minutes and try again.", 429);
    }

    const raw = await request.text();
    if (raw.length > LIMITS.body) return fail("That message is too long.", 413);

    let body: unknown;
    try {
      body = JSON.parse(raw);
    } catch {
      return fail("Unsupported request.", 400);
    }
    if (!body || typeof body !== "object" || Array.isArray(body)) return fail("Unsupported request.", 400);
    const { name, email, message, honeypot } = body as Record<string, unknown>;

    // Honeypot: a hidden field real visitors never fill in.
    if (honeypot) return fail("Spam detected.", 400);

    if (typeof name !== "string" || oneLine(name).length === 0) return fail("Name is required.", 400);
    if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return fail("A valid email address is required.", 400);
    }
    if (typeof message !== "string" || clean(message).length < 5) {
      return fail("Message must be at least 5 characters.", 400);
    }

    const safeName = oneLine(name);
    const safeEmail = oneLine(email);
    const safeMessage = clean(message);
    if (safeName.length > LIMITS.name) return fail(`Please keep your name under ${LIMITS.name} characters.`, 400);
    if (safeEmail.length > LIMITS.email) return fail("That email address is too long.", 400);
    if (safeMessage.length > LIMITS.message) {
      return fail(`Please keep your message under ${LIMITS.message.toLocaleString("en")} characters.`, 400);
    }

    // FormSubmit wants to know which site a message came from. Use this site's own origin,
    // checked above, never a value the visitor could choose.
    const siteOrigin = `${new URL(request.url).protocol}//${host}`;

    let delivered = false;
    let reason = "";
    try {
      const emailResponse = await fetch("https://formsubmit.co/ajax/sathwikkatkam@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Origin: siteOrigin,
          Referer: `${siteOrigin}/`,
        },
        body: JSON.stringify({
          name: safeName,
          email: safeEmail,
          message: safeMessage,
          _replyto: safeEmail,
          _subject: `Portfolio message from ${safeName}`,
          _template: "table",
          _captcha: "false",
        }),
        signal: AbortSignal.timeout(15000),
      });

      const emailResult = await emailResponse.json().catch(() => ({}));
      delivered = emailResponse.ok && String(emailResult.success) === "true";
      if (!delivered) {
        reason = String(emailResult.message ?? `HTTP ${emailResponse.status}`);
        console.error("FormSubmit error:", reason);
      }
    } catch (err) {
      reason = "email service unreachable";
      console.error("Email dispatch failed:", err instanceof Error ? err.message : "unknown error");
    }

    // Only claim success when the email service actually accepted the message.
    if (!delivered) {
      const needsActivation = /activat/i.test(reason);
      return fail(
        needsActivation
          ? "The contact form is being set up and can't deliver messages yet. Please email me directly for now."
          : "Your message couldn't be sent right now. Please try again, or email me directly.",
        502
      );
    }

    return NextResponse.json(
      { success: true, message: "Thanks! Your message is on its way to my inbox." },
      { status: 200, headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Contact API error:", error instanceof Error ? error.message : "unknown error");
    return fail("Something went wrong. Please try again later.", 500);
  }
}
