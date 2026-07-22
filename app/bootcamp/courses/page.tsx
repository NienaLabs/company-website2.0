import { courses } from '../../../lib/courses';
import CoursesClient from '../../components/bootcamp/CoursesClient';
import { BookOpen, ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Software Development Bootcamp — Niena Labs',
  description: 'Choose your track: Frontend Web, Frontend Mobile, or Backend Development. 2-month intensive virtual bootcamp running 7 September to 7 November 2026.',
};

export default function CoursesPage() {
  return (
    <div style={{ background: 'var(--color-void)', minHeight: '100vh', paddingBottom: 'var(--space-10)' }}>
      {/* Navigation Bar */}
      <div className="section-container" style={{ paddingTop: 'var(--space-6)', paddingBottom: 'var(--space-4)', borderBottom: 'var(--border-hairline)' }}>
        <Link href="/" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <ArrowLeft size={12} /> Back to Home
        </Link>
      </div>

      {/* Header */}
      <div className="section-container" style={{ paddingTop: 'var(--space-10)', paddingBottom: 'var(--space-8)', borderBottom: 'var(--border-gold-faint)' }}>
        <div style={{ maxWidth: '800px' }}>
          <div className="overline" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-4)' }}>
            <BookOpen size={12} /> All Programs
          </div>
          <h1 className="font-cormorant" style={{ fontSize: '64px', fontWeight: 300, lineHeight: 1.0, color: 'var(--color-text-primary)', marginBottom: 'var(--space-6)' }}>
            Software Development <span style={{ color: 'var(--color-gold)' }}>Bootcamp</span>
          </h1>
          <p className="font-garamond" style={{ fontSize: '18px', color: 'var(--color-text-secondary)', lineHeight: 1.8, maxWidth: '620px' }}>
    <b>{"//"} The only software engineering bootcamp you&apos;ll ever need.</b><br/>
Master everything required to thrive in today&apos;s AI-powered software industry,from production-grade development and modern engineering workflows to the system design principles that separate junior developers from elite engineers.
Choose the path which fits your need.
          </p>
        </div>
      </div>

      <CoursesClient />
    </div>
  );
}
