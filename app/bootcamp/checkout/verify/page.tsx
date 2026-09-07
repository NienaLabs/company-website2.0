import { redirect } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, XCircle } from 'lucide-react';
import { courses } from '../../../../lib/courses';
import { getWelcomeEmailHtml, getAdminEnrollmentEmailHtml } from '../../../../lib/email-templates';
import { Resend } from 'resend';

export default async function VerifyPaymentPage({
  searchParams,
}: {
  searchParams: { reference?: string };
}) {
  const reference = searchParams.reference;

  if (!reference) {
    redirect('/bootcamp/courses');
  }

  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  if (!secretKey) {
    return (
      <div className="section-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 140px)', padding: 'var(--space-4)' }}>
        <div className="bento-cell" style={{ maxWidth: '600px', width: '100%', padding: 'clamp(24px, 5vw, var(--space-8))', textAlign: 'center' }}>
          <h1 className="font-display" style={{ fontSize: '32px', color: 'var(--color-error)' }}>Configuration Error</h1>
          <p className="font-body" style={{ fontSize: '18px', color: 'var(--color-text-secondary)', marginTop: '16px' }}>Payment gateway is not configured properly.</p>
        </div>
      </div>
    );
  }

  let isSuccess = false;
  let errorMsg = '';
  let customerEmail = '';

  try {
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${secretKey}`,
      },
      // Do not cache this request
      cache: 'no-store',
    });

    const data = await response.json();

    if (response.ok && data.status && data.data.status === 'success') {
      isSuccess = true;
      customerEmail = data.data.customer?.email || '';

      const metadata = data.data.metadata || {};
      const courseId = metadata.courseId;
      const firstName = metadata.firstName || '';
      const lastName = metadata.lastName || '';
      const phone = metadata.phone || '';
      // Paystack amount is in the smallest currency unit (pesewas); convert back to GHS.
      const amountPaid = data.data.amount ? Math.round(data.data.amount) / 100 : 0;

      const course = courses.find(c => c.id === courseId);
      const courseTitle = course ? course.title : 'Niena Labs Bootcamp';

      if (process.env.RESEND_API_KEY) {
        const resend = new Resend(process.env.RESEND_API_KEY);

        // 1. Welcome email to the student (confirmed payment).
        if (customerEmail) {
          try {
            await resend.emails.send({
              from: 'Niena Labs Bootcamp <bootcamp@nienalabs.com>', // Requires a verified nienalabs.com domain in Resend
              to: customerEmail,
              subject: 'Welcome to the Niena Labs Bootcamp',
              html: getWelcomeEmailHtml(firstName, courseTitle),
            });
          } catch (emailErr) {
            console.error('Failed to send welcome email:', emailErr);
          }
        }

        // 2. Admin alert for internal tracking (payment already verified via Paystack).
        try {
          await resend.emails.send({
            from: 'Niena Labs Bootcamp <enrollments@nienalabs.com>',
            to: 'hello@nienalabs.com',
            replyTo: customerEmail || undefined,
            subject: `New enrollment (PAID) · ${`${firstName} ${lastName}`.trim() || customerEmail} · ${courseTitle}`,
            html: getAdminEnrollmentEmailHtml({
              fullName: `${firstName} ${lastName}`.trim(),
              email: customerEmail,
              phone,
              courseTitle,
              amount: amountPaid,
              method: 'Paystack',
              status: 'paid',
              reference,
            }),
          });
        } catch (adminErr) {
          console.error('Failed to send admin enrollment alert:', adminErr);
        }
      }
    } else {
      errorMsg = data.message || 'Payment verification failed.';
    }
  } catch (err) {
    console.error('Payment verification error:', err);
    errorMsg = 'Failed to connect to the payment gateway.';
  }

  return (
    <div className="section-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 140px)', padding: 'var(--space-4)' }}>
      <div className="bento-cell" style={{ maxWidth: '600px', width: '100%', padding: 'clamp(24px, 5vw, var(--space-8))', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(16px, 4vw, var(--space-5))', boxSizing: 'border-box' }}>
        <div style={{ width: 'clamp(64px, 10vw, 80px)', height: 'clamp(64px, 10vw, 80px)', borderRadius: '50%', background: isSuccess ? 'rgba(201,168,76,0.1)' : 'rgba(255,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {isSuccess ? (
            <CheckCircle color="var(--color-gold)" size={40} />
          ) : (
            <XCircle color="var(--color-error)" size={40} />
          )}
        </div>

        <h1 className="font-display" style={{ fontSize: 'clamp(32px, 6vw, 42px)', color: 'var(--color-text-primary)', lineHeight: 1.1, margin: 0 }}>
          {isSuccess ? 'Payment Successful!' : 'Payment Failed'}
        </h1>

        <p className="font-body" style={{ fontSize: 'clamp(16px, 3.5vw, 18px)', color: 'var(--color-text-secondary)', lineHeight: 1.6, maxWidth: '400px', width: '100%', margin: 0 }}>
          {isSuccess ? (
            <>
              Thank you! Your payment was verified successfully.
              {customerEmail && ` A receipt has been sent to ${customerEmail}.`}
              <br /><br />
              We will add you to the exclusive WhatsApp group shortly.
            </>
          ) : (
            <>
              Unfortunately, your payment could not be processed. Reason: {errorMsg}
            </>
          )}
        </p>

        {isSuccess && (
          <div style={{ background: 'var(--color-void)', border: 'var(--border-subtle)', borderRadius: 'var(--radius-cell)', padding: 'clamp(16px, 4vw, var(--space-4))', width: '100%', marginTop: 'clamp(8px, 2vw, var(--space-4))', boxSizing: 'border-box' }}>
            <p className="font-mono" style={{ fontSize: '9px', color: 'var(--color-gold)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '8px', margin: 0, paddingBottom: '8px' }}>
              What happens next?
            </p>
            <p className="font-body" style={{ fontSize: 'clamp(14px, 3vw, 15px)', color: 'var(--color-text-secondary)', margin: 0 }}>
              Keep an eye on your WhatsApp. Our team will reach out to you within 24 hours with your onboarding details and course access links.
            </p>
          </div>
        )}

        <Link href={isSuccess ? "/bootcamp/courses" : "/bootcamp/checkout"} className={isSuccess ? "btn-primary" : "btn-secondary"} style={{ marginTop: 'clamp(16px, 4vw, var(--space-6))', width: '100%', textAlign: 'center', boxSizing: 'border-box' }}>
          {isSuccess ? 'Return to Programs' : 'Try Again'}
        </Link>
      </div>
    </div>
  );
}
