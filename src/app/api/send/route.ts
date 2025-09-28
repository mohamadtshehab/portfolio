import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);
const toEmail = process.env.EMAIL_TO;

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!toEmail) {
      // It's crucial to check if the environment variable is set.
      return NextResponse.json({ error: 'Recipient email not configured.' }, { status: 500 });
    }

    const { error: resendError } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: [toEmail],
      subject: `New Message from ${name} via Portfolio`,
      replyTo: email,
      html: `
        <p>You have a new message from your portfolio contact form.</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (resendError) {
      return NextResponse.json({ error: resendError.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Email sent successfully!' });
  } catch (err) {
    // Use the specific error object 'err' to provide more detail.
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}