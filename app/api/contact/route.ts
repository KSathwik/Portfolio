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

    // Direct Zero-Setup Email Delivery via FormSubmit API
    try {
      const emailResponse = await fetch("https://formsubmit.co/ajax/sathwikkatkam@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `Portfolio Message from ${name}`,
          _template: "table",
          _captcha: "false",
        }),
      });

      const emailResult = await emailResponse.json();

      if (!emailResponse.ok || emailResult.success === "false") {
        console.error("FormSubmit API Error:", emailResult);
      }
    } catch (err) {
      console.error("Email dispatch exception:", err);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your message has been delivered directly to Sathwik's email.",
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
