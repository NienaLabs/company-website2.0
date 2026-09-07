import { Suspense } from 'react';
import CheckoutClient from './CheckoutClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Secure Checkout — Niena Labs Bootcamp',
  description: 'Complete your enrollment securely.',
};

export default function CheckoutPage() {
  return (
    <div style={{ background: 'var(--color-void)', minHeight: '100vh' }}>
      <Suspense fallback={
        <div className="section-container" style={{ paddingTop: 'var(--space-10)', textAlign: 'center' }}>
          <h1 className="font-display" style={{ fontSize: '48px', color: 'var(--color-text-primary)' }}>Loading Checkout...</h1>
        </div>
      }>
        <CheckoutClient />
      </Suspense>
    </div>
  );
}
