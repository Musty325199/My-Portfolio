import { NextRequest, NextResponse } from "next/server";
import { PORTFOLIO_CONTENT } from "@/data/content";

interface ContactRateLimit {
  count: number;
  resetAt: number;
}
const contactRateLimitMap = new Map<string, ContactRateLimit>();
const CONTACT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_CONTACT_REQUESTS = 4;

function checkContactRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = contactRateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    contactRateLimitMap.set(ip, { count: 1, resetAt: now + CONTACT_WINDOW_MS });
    return true;
  }

  if (entry.count >= MAX_CONTACT_REQUESTS) {
    return false;
  }

  entry.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    if (!checkContactRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many messages sent. Please email mustyflowcrm@gmail.com directly or send a WhatsApp message." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const { name, email, message, company, honeypot } = body;

    // Honeypot check for bots
    if (honeypot && String(honeypot).trim().length > 0) {
      // Silently return success to confuse spam bots
      return NextResponse.json({ success: true, message: "Message received." });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      // Resend key not configured - tell client to use mailto fallback
      return NextResponse.json({
        fallbackMailto: true,
        mailtoUrl: `mailto:${PORTFOLIO_CONTENT.links.email}?subject=${encodeURIComponent(
          `Project inquiry from ${name}${company ? ` (${company})` : ""}`
        )}&body=${encodeURIComponent(
          `Hi Musty,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}${company ? `\nCompany: ${company}` : ""}`
        )}`,
        message: "No email service key configured; opening your email client directly.",
      });
    }

    // Send email via Resend API
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: PORTFOLIO_CONTENT.links.email,
        reply_to: email,
        subject: `New Portfolio Inquiry from ${name}${company ? ` (${company})` : ""}`,
        text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || "N/A"}\n\nMessage:\n${message}`,
      }),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      return NextResponse.json({
        fallbackMailto: true,
        mailtoUrl: `mailto:${PORTFOLIO_CONTENT.links.email}?subject=${encodeURIComponent(
          `Project inquiry from ${name}`
        )}&body=${encodeURIComponent(message)}`,
        error: "Direct transmission failed; please use email client.",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Message dispatched successfully. Musty will get back to you shortly.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        fallbackMailto: true,
        mailtoUrl: `mailto:${PORTFOLIO_CONTENT.links.email}`,
        error: "Unexpected transmission error.",
      },
      { status: 500 }
    );
  }
}
