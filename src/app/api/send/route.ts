import { Resend } from 'resend';
import { NextRequest } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);
const toEmail = process.env.EMAIL_TO;

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();
    const { data, error } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>', // Must be from a verified domain in production
      to: [toEmail],
      subject: `New Message from ${name} via Portfolio`,
      reply_to: email,
      html: `<p>You have a new message from your portfolio contact form.</p>
             <p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong></p>
             <p>${message}</p>`,
    });

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ message: 'Email sent successfully!' });
  } catch (error) {
    return Response.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}