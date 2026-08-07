import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, honeypot } = body;

    // Honeypot spam protection check
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

    // Resend Email API Integration
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Portfolio Contact Form <onboarding@resend.dev>",
          to: ["sathwikkatkam@gmail.com"],
          subject: `Portfolio Contact: ${name}`,
          reply_to: email,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <blockquote style="background: #f4f4f4; padding: 12px; border-left: 4px solid #333;">
              ${message.replace(/\n/g, "<br>")}
            </blockquote>
          `,
        }),
      });

      if (!resendResponse.ok) {
        const errorData = await resendResponse.json();
        console.error("Resend API Error:", errorData);
        return NextResponse.json(
          { success: false, message: "Failed to dispatch email via Resend API." },
          { status: 500 }
        );
      }
    } else {
      // Log for local environment when RESEND_API_KEY is not configured
      console.log(`[Contact API] Received submission from ${name} <${email}>: "${message.slice(0, 60)}..."`);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for reaching out! Your message has been sent successfully.",
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
