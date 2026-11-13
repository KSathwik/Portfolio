import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, honeypot } = body;

    // Honeypot anti-spam check
    if (honeypot) {
      return NextResponse.json(
        { success: false, message: "Spam detected." },
        { status: 400 }
      );
    }

    // Input Validation
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: "Name is required." },
        { status: 400 }
      );
    }

    if (
      !email ||
      typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return NextResponse.json(
        { success: false, message: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { success: false, message: "Message must be at least 5 characters." },
        { status: 400 }
      );
    }

    // Email delivery via FormSubmit. It rejects requests that don't say which site they came
    // from, so forward the visitor's page origin (falling back to this request's own origin).
    const siteOrigin =
      request.headers.get("origin") ?? new URL(request.url).origin;

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
          name,
          email,
          message,
          _replyto: email,
          _subject: `Portfolio Message from ${name}`,
          _template: "table",
          _captcha: "false",
        }),
        signal: AbortSignal.timeout(15000),
      });

      const emailResult = await emailResponse.json().catch(() => ({}));
      delivered = emailResponse.ok && String(emailResult.success) === "true";
      if (!delivered) {
        reason = String(emailResult.message ?? `HTTP ${emailResponse.status}`);
        console.error("FormSubmit API Error:", emailResult);
      }
    } catch (err) {
      reason = "email service unreachable";
      console.error("Email dispatch exception:", err);
    }

    // Only claim success when the email service actually accepted the message.
    if (!delivered) {
      const needsActivation = /activat/i.test(reason);
      return NextResponse.json(
        {
          success: false,
          message: needsActivation
            ? "The contact form is being set up and can't deliver messages yet. Please email me directly for now."
            : "Your message couldn't be sent right now. Please try again, or email me directly.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thanks! Your message is on its way to my inbox.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in contact API route:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
