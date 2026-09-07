import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { courses, isEarlyBird } from '../../../lib/courses';
import { getAdminEnrollmentEmailHtml, getEnrollmentReceivedEmailHtml } from '../../../lib/email-templates';

// Inbox that receives admin enrollment alerts for internal tracking.
const ADMIN_EMAIL = 'hello@nienalabs.com';

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, phone, courseId, amount } = await request.json();

    if (!email || !phone || !courseId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const course = courses.find((c) => c.id === courseId);
    const courseTitle = course ? course.title : 'Niena Labs Bootcamp';
    const fullName = `${firstName || ''} ${lastName || ''}`.trim();

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set');
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const resolvedAmount = Number(amount) || (course ? (isEarlyBird() ? course.earlyBirdPrice : course.regularPrice) : 0);

    // 1. Admin alert for internal tracking + payment verification.
    const { error: adminError } = await resend.emails.send({
      from: 'Niena Labs Bootcamp <enrollments@nienalabs.com>',
      to: ADMIN_EMAIL,
      replyTo: email,
      subject: `Bank Transfer — verify payment · ${fullName || email} · ${courseTitle}`,
      html: getAdminEnrollmentEmailHtml({
        fullName,
        email,
        phone,
        courseTitle,
        amount: resolvedAmount,
        method: 'Bank Transfer',
        status: 'pending',
      }),
    });

    if (adminError) {
      console.error('Resend Error (admin enrollment alert):', adminError);
      return NextResponse.json({ error: adminError.message || 'Failed to send notification' }, { status: 500 });
    }

    // 2. Confirmation to the student (spot reserved, payment being verified).
    try {
      await resend.emails.send({
        from: 'Niena Labs Bootcamp <bootcamp@nienalabs.com>',
        to: email,
        replyTo: ADMIN_EMAIL,
        subject: 'We received your enrollment — Niena Labs Bootcamp',
        html: getEnrollmentReceivedEmailHtml(firstName, courseTitle, resolvedAmount),
      });
    } catch (studentErr) {
      // Don't fail the request if only the student copy fails; the admin was still notified.
      console.error('Failed to send student confirmation email:', studentErr);
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    console.error('Enroll notify error:', err);
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
