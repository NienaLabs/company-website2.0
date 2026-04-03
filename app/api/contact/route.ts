import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, idea } = await request.json();

    if (!name || !email || !idea) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'Niena Labs <contact@Niena Labs.com>',
      to: 'hello@Niena Labs.com',
      subject: `New Project Idea from ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee;">
          <h2 style="color: #c9a84c; border-bottom: 1px solid #c9a84c; padding-bottom: 10px;">New Contact Form Submission</h2>
          <div style="margin-top: 20px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Project Idea:</strong></p>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; font-style: italic;">
              ${idea.replace(/\n/g, '<br/>')}
            </div>
          </div>
          <footer style="margin-top: 30px; font-size: 12px; color: #888; border-top: 1px solid #eee; padding-top: 10px;">
            This email was sent from the Niena Labs website contact form.
          </footer>
        </div>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      // Return the actual error message to help the user debug (e.g., domain not verified)
      return NextResponse.json({
        error: error.message || 'Error sending email',
        code: error.name
      }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (err: any) {
    console.error('API Error:', err);
    return NextResponse.json({
      error: err.message || 'Internal Server Error'
    }, { status: 500 });
  }
}
