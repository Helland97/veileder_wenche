import { NextResponse } from "next/server";
import { Resend } from "resend";
import BookingEmail from "@/emails/BookingEmail";

export async function POST(request: Request) {
  const body = await request.json();
  const { service, date, time, name, email, phone, message } = body;

  if (!service || !date || !time || !name || !email || !phone) {
    return NextResponse.json(
      { error: "Alle påkrevde felt må fylles ut" },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return NextResponse.json(
      { error: "E-posttjenesten er ikke konfigurert" },
      { status: 500 }
    );
  }

  // Future: Create Stripe checkout session here
  // if (shouldCollectPayment) {
  //   const session = await stripe.checkout.sessions.create({ ... });
  //   return NextResponse.json({ checkoutUrl: session.url });
  // }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "Booking <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL || "kontakt@wencheveileder.no",
      replyTo: email,
      subject: `Ny timebestilling: ${service} - ${date} kl. ${time}`,
      react: BookingEmail({ service, date, time, name, email, phone, message }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Booking email error:", error);
    return NextResponse.json(
      { error: "Kunne ikke sende bestilling" },
      { status: 500 }
    );
  }
}
