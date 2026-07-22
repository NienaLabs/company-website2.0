'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { courses, isEarlyBird } from '../../../lib/courses';
import Link from 'next/link';
import { ArrowLeft, Lock, Shield, CreditCard, CheckCircle, Loader2, Landmark, Mail, AlertCircle, MessageCircle } from 'lucide-react';
import { useState } from 'react';

export default function CheckoutClient() {
  const searchParams = useSearchParams();
  const courseId = searchParams.get('courseId');
  
  const course = courses.find((c) => c.id === courseId);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'paystack' | 'bank'>('paystack');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  if (!course) {
    return (
      <div className="section-container" style={{ paddingTop: 'var(--space-10)', textAlign: 'center' }}>
        <h1 className="font-display" style={{ fontSize: '48px', color: 'var(--color-text-primary)' }}>Course Not Found</h1>
        <Link href="/bootcamp/courses" className="btn-secondary" style={{ marginTop: 'var(--space-6)', display: 'inline-block' }}>
          Back to Programs
        </Link>
      </div>
    );
  }

  const earlyBird = isEarlyBird();
  const activePrice = earlyBird ? course.earlyBirdPrice : course.regularPrice;
  // Paystack adds a 5% processing fee; manual bank transfer has no added charges.
  const tax = paymentMethod === 'paystack' ? Math.round(activePrice * 0.05) : 0;
  const total = activePrice + tax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (paymentMethod === 'paystack') {
      try {
        const response = await fetch('/api/paystack/initialize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            amount: total,
            courseId: course.id,
            firstName,
            lastName,
            phone,
          }),
        });

        const data = await response.json();

        if (response.ok && data.data && data.data.authorization_url) {
          window.location.href = data.data.authorization_url;
        } else {
          console.error('Paystack initialization failed', data);
          alert(`Payment initialization failed: ${data.error || 'Unknown error'}`);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error initializing payment:', error);
        alert('An error occurred while initializing payment. Please try again.');
        setLoading(false);
      }
    } else {
      // Manual bank transfer: notify admin so they can verify the payment before onboarding.
      try {
        await fetch('/api/enroll', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            phone,
            courseId: course.id,
            amount: total,
          }),
        });
      } catch (error) {
        // Don't block the student's confirmation screen if the alert fails; it's logged server-side.
        console.error('Failed to send enrollment notification:', error);
      } finally {
        setLoading(false);
        setIsSuccess(true);
      }
    }
  };

  if (isSuccess) {
    return (
      <div className="section-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 140px)', padding: 'var(--space-4)' }}>
        <div className="bento-cell" style={{ maxWidth: '600px', width: '100%', padding: 'clamp(24px, 5vw, var(--space-8))', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(16px, 4vw, var(--space-5))', boxSizing: 'border-box' }}>
          <div style={{ width: 'clamp(64px, 10vw, 80px)', height: 'clamp(64px, 10vw, 80px)', borderRadius: '50%', background: 'rgba(201,168,76,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <CheckCircle color="var(--color-gold)" size={40} />
          </div>
          
          <h1 className="font-display" style={{ fontSize: 'clamp(32px, 6vw, 42px)', color: 'var(--color-text-primary)', lineHeight: 1.1, margin: 0 }}>
            Enrollment Received!
          </h1>
          
          <p className="font-body" style={{ fontSize: 'clamp(16px, 3.5vw, 18px)', color: 'var(--color-text-secondary)', lineHeight: 1.6, maxWidth: '400px', width: '100%', margin: 0 }}>
            Thank you for enrolling in <strong style={{ color: 'var(--color-text-primary)' }}>{course.title}</strong>. 
            We are verifying your payment details now. Once confirmed, we will add you to the exclusive WhatsApp group using the number you provided.
          </p>

          <div style={{ background: 'var(--color-void)', border: 'var(--border-subtle)', borderRadius: 'var(--radius-cell)', padding: 'clamp(16px, 4vw, var(--space-4))', width: '100%', marginTop: 'clamp(8px, 2vw, var(--space-4))', boxSizing: 'border-box' }}>
            <p className="font-mono" style={{ fontSize: '9px', color: 'var(--color-gold)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '8px', margin: 0, paddingBottom: '8px' }}>
              What happens next?
            </p>
            <p className="font-body" style={{ fontSize: 'clamp(14px, 3vw, 15px)', color: 'var(--color-text-secondary)', margin: 0 }}>
              Keep an eye on your WhatsApp. Our team will reach out to you within 24 hours with your onboarding details and course access links.
            </p>
          </div>

          <Link href="/bootcamp/courses" className="btn-primary" style={{ marginTop: 'clamp(16px, 4vw, var(--space-6))', width: '100%', textAlign: 'center', boxSizing: 'border-box' }}>
            Return to Programs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="section-container" style={{ paddingTop: 'var(--space-6)', paddingBottom: 'var(--space-10)' }}>
      <Link href={`/bootcamp/courses/${course.slug}`} className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-8)' }}>
        <ArrowLeft size={12} /> Back to Course
      </Link>

      <div className="checkout-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 'var(--space-8)', alignItems: 'start' }}>
        
        {/* Left: Checkout Form */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: 'var(--space-8)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(201,168,76,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Lock color="var(--color-gold)" size={24} />
            </div>
            <h1 className="font-display" style={{ fontSize: '48px', color: 'var(--color-text-primary)', lineHeight: 1 }}>
              Secure Checkout
            </h1>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            
            {/* Step 1: Account */}
            <div className="bento-cell" style={{ padding: 'var(--space-6)' }}>
              <h2 className="font-display" style={{ fontSize: '28px', color: 'var(--color-text-primary)', marginBottom: 'var(--space-5)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span className="font-mono" style={{ fontSize: '14px', color: 'var(--color-gold)', letterSpacing: '0.1em' }}>01</span> 
                Your Details
              </h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label className="font-mono" style={{ fontSize: '10px', color: 'var(--color-text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>First Name</label>
                  <input type="text" required placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} style={{ background: 'var(--color-slate-mid)', border: 'var(--border-subtle)', borderRadius: 'var(--radius-cell)', padding: '12px 16px', color: 'var(--color-text-primary)', fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', outline: 'none' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label className="font-mono" style={{ fontSize: '10px', color: 'var(--color-text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Last Name</label>
                  <input type="text" required placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} style={{ background: 'var(--color-slate-mid)', border: 'var(--border-subtle)', borderRadius: 'var(--radius-cell)', padding: '12px 16px', color: 'var(--color-text-primary)', fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', outline: 'none' }} />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: 'var(--space-4)' }}>
                <label className="font-mono" style={{ fontSize: '10px', color: 'var(--color-text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Email Address</label>
                <input type="email" required placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} style={{ background: 'var(--color-slate-mid)', border: 'var(--border-subtle)', borderRadius: 'var(--radius-cell)', padding: '12px 16px', color: 'var(--color-text-primary)', fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', outline: 'none', width: '100%' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label className="font-mono" style={{ fontSize: '10px', color: 'var(--color-text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>WhatsApp Number</label>
                <input type="tel" required placeholder="+233 55 000 0000" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ background: 'var(--color-slate-mid)', border: 'var(--border-subtle)', borderRadius: 'var(--radius-cell)', padding: '12px 16px', color: 'var(--color-text-primary)', fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', outline: 'none', width: '100%' }} />
              </div>
            </div>

            {/* Step 2: Payment */}
            <div className="bento-cell" style={{ padding: 'var(--space-6)' }}>
              <h2 className="font-display" style={{ fontSize: '28px', color: 'var(--color-text-primary)', marginBottom: 'var(--space-5)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span className="font-mono" style={{ fontSize: '14px', color: 'var(--color-gold)', letterSpacing: '0.1em' }}>02</span> 
                Payment Method
              </h2>

              <div style={{ display: 'flex', gap: '16px', marginBottom: 'var(--space-5)' }}>
                <button 
                  type="button" 
                  onClick={() => setPaymentMethod('paystack')}
                  style={{ flex: 1, padding: '12px', background: paymentMethod === 'paystack' ? 'rgba(201,168,76,0.1)' : 'var(--color-slate-mid)', border: paymentMethod === 'paystack' ? 'var(--border-gold)' : 'var(--border-subtle)', borderRadius: 'var(--radius-cell)', color: paymentMethod === 'paystack' ? 'var(--color-gold)' : 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontFamily: "var(--font-mono)", fontSize: '11px', letterSpacing: '0.1em', transition: 'all 200ms ease' }}
                >
                  <CreditCard size={14} /> Paystack
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank')}
                  style={{ flex: 1, padding: '12px', background: paymentMethod === 'bank' ? 'rgba(201,168,76,0.1)' : 'var(--color-slate-mid)', border: paymentMethod === 'bank' ? 'var(--border-gold)' : 'var(--border-subtle)', borderRadius: 'var(--radius-cell)', color: paymentMethod === 'bank' ? 'var(--color-gold)' : 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontFamily: "var(--font-mono)", fontSize: '11px', letterSpacing: '0.1em', transition: 'all 200ms ease' }}
                >
                  <Landmark size={14} /> Bank Transfer
                </button>
              </div>

              {paymentMethod === 'paystack' ? (
                <div style={{ background: 'rgba(201,168,76,0.05)', border: 'var(--border-gold-faint)', borderRadius: 'var(--radius-cell)', padding: 'var(--space-5)', marginBottom: 'var(--space-5)' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <Shield size={24} color="var(--color-gold)" style={{ flexShrink: 0 }} />
                    <div>
                      <h3 className="font-body" style={{ fontSize: '18px', color: 'var(--color-text-primary)', marginBottom: '4px' }}>Secure Paystack Checkout</h3>
                      <p className="font-body" style={{ fontSize: '15px', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                        You will be securely redirected to Paystack&apos;s official payment gateway to complete your transaction via Card, Mobile Money, or Bank Transfer. A 5% processing fee applies to this method.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ background: 'rgba(201,168,76,0.05)', border: 'var(--border-gold-faint)', borderRadius: 'var(--radius-cell)', padding: 'var(--space-5)', marginBottom: 'var(--space-5)' }}>
                  <div style={{ display: 'flex', gap: '12px', marginBottom: 'var(--space-4)' }}>
                    <AlertCircle size={20} color="var(--color-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <h3 className="font-body" style={{ fontSize: '18px', color: 'var(--color-text-primary)', marginBottom: '8px' }}>Manual Bank Transfer</h3>
                      <p className="font-body" style={{ fontSize: '15px', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                        No processing fee — you pay exactly the course price. Transfer the amount directly to our bank account below, then confirm your payment so we can complete your enrollment.
                      </p>
                    </div>
                  </div>

                  <div style={{ background: 'var(--color-void)', border: 'var(--border-subtle)', borderRadius: 'var(--radius-cell)', padding: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', marginBottom: '8px' }}>
                      <span className="font-mono" style={{ fontSize: '9px', color: 'var(--color-text-muted)', letterSpacing: '0.1em' }}>Bank Name</span>
                      <span className="font-body" style={{ fontSize: '16px', color: 'var(--color-text-primary)', fontWeight: 600, textAlign: 'right' }}>Guaranty Trust Bank</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', marginBottom: '8px' }}>
                      <span className="font-mono" style={{ fontSize: '9px', color: 'var(--color-text-muted)', letterSpacing: '0.1em' }}>Account Number</span>
                      <span className="font-body" style={{ fontSize: '16px', color: 'var(--color-text-primary)', fontWeight: 600, letterSpacing: '0.05em' }}>1304001001886</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', marginBottom: '8px' }}>
                      <span className="font-mono" style={{ fontSize: '9px', color: 'var(--color-text-muted)', letterSpacing: '0.1em' }}>Account Name</span>
                      <span className="font-body" style={{ fontSize: '16px', color: 'var(--color-text-primary)' }}>Adomako Yaw</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                      <span className="font-mono" style={{ fontSize: '9px', color: 'var(--color-text-muted)', letterSpacing: '0.1em' }}>Amount</span>
                      <span className="font-body" style={{ fontSize: '16px', color: 'var(--color-gold)', fontWeight: 600 }}>GH₵{total}</span>
                    </div>
                  </div>

                  <p className="font-body" style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '12px' }}>
                    After transferring, send us your payment confirmation (screenshot) along with your name and WhatsApp number so we can verify and onboard you:
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-secondary)', padding: '8px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px', marginBottom: '8px' }}>
                    <Mail size={14} color="var(--color-text-muted)" style={{ flexShrink: 0 }} />
                    <span className="font-body" style={{ fontSize: '14px' }}>
                      Email <strong style={{ color: 'var(--color-text-primary)' }}>support@nienalabs.com</strong>
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-secondary)', padding: '8px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px' }}>
                    <MessageCircle size={14} color="var(--color-text-muted)" style={{ flexShrink: 0 }} />
                    <span className="font-body" style={{ fontSize: '14px' }}>
                      WhatsApp <strong style={{ color: 'var(--color-text-primary)' }}>+233 55 283 7672</strong> or <strong style={{ color: 'var(--color-text-primary)' }}>+233 55 673 2796</strong>
                    </span>
                  </div>
                </div>
              )}
            </div>

            {paymentMethod === 'paystack' ? (
              <button type="submit" className="btn-primary" disabled={loading} style={{ padding: '20px', fontSize: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px' }}>
                {loading ? <Loader2 className="animate-spin" size={20} /> : <Lock size={20} />}
                {loading ? 'Processing...' : `Complete Enrollment — GH₵${total}`}
              </button>
            ) : (
              <button type="submit" className="btn-secondary" disabled={loading} style={{ padding: '20px', fontSize: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px' }}>
                {loading ? <Loader2 className="animate-spin" size={20} /> : <CheckCircle size={20} />}
                {loading ? 'Processing...' : `I have made the transfer`}
              </button>
            )}

            <div style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>
              <span className="font-body" style={{ fontSize: '14px', fontStyle: 'italic', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <CheckCircle size={12} color="var(--color-success)" /> 14-day money-back guarantee · No hidden fees
              </span>
            </div>
          </form>
        </div>

        {/* Right: Order Summary */}
        <div style={{ position: 'sticky', top: '100px' }}>
          <div className="bento-cell" style={{ padding: 'var(--space-6)', border: 'var(--border-gold-faint)' }}>
            <h2 className="font-display" style={{ fontSize: '32px', color: 'var(--color-text-primary)', marginBottom: 'var(--space-6)', borderBottom: 'var(--border-hairline)', paddingBottom: 'var(--space-4)' }}>
              Order Summary
            </h2>

            <div style={{ display: 'flex', gap: '16px', marginBottom: 'var(--space-6)' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: 'var(--radius-cell)', background: 'rgba(201,168,76,0.1)', border: 'var(--border-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold)', fontFamily: "var(--font-mono)", fontSize: '24px' }}>
                {course.title.charAt(0)}
              </div>
              <div>
                <div className="font-body" style={{ fontSize: '20px', color: 'var(--color-text-primary)', lineHeight: 1.2, marginBottom: '4px' }}>{course.title}</div>
                <div className="font-mono" style={{ fontSize: '10px', color: 'var(--color-text-muted)', letterSpacing: '0.1em' }}>{course.level} · {course.duration}</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', borderTop: 'var(--border-hairline)', borderBottom: 'var(--border-hairline)', padding: 'var(--space-5) 0', marginBottom: 'var(--space-5)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="font-body" style={{ fontSize: '18px', color: 'var(--color-text-secondary)' }}>Course Price</span>
                <span className="font-body" style={{ fontSize: '18px', color: 'var(--color-text-primary)' }}>GH₵{activePrice}</span>
              </div>
              {paymentMethod === 'paystack' ? (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="font-body" style={{ fontSize: '18px', color: 'var(--color-text-secondary)' }}>Processing Fee (5%)</span>
                  <span className="font-body" style={{ fontSize: '18px', color: 'var(--color-text-primary)' }}>GH₵{tax}</span>
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="font-body" style={{ fontSize: '18px', color: 'var(--color-text-secondary)' }}>Processing Fee</span>
                  <span className="font-body" style={{ fontSize: '18px', color: 'var(--color-success)' }}>No charge</span>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 'var(--space-6)' }}>
              <span className="font-mono" style={{ fontSize: '14px', color: 'var(--color-text-primary)', letterSpacing: '0.1em' }}>Total</span>
              <span className="font-display" style={{ fontSize: '42px', color: 'var(--color-text-primary)', lineHeight: 1 }}>GH₵{total}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p className="font-mono" style={{ fontSize: '10px', color: 'var(--color-gold)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '4px' }}>Includes:</p>
              {[
                `${course.sessions} live sessions`,
                `${course.duration} of content`,
                'Certificate of completion',
                'Lifetime access',
                'Private community access',
              ].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <CheckCircle size={14} color="var(--color-gold)" />
                  <span className="font-body" style={{ fontSize: '16px', color: 'var(--color-text-secondary)' }}>{item}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
      <style>{`
        @media (max-width: 900px) {
          .checkout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
