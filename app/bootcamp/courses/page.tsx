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
          <h1 className="font-display" style={{ fontSize: '64px', fontWeight: 300, lineHeight: 1.0, color: 'var(--color-text-primary)', marginBottom: 'var(--space-6)' }}>
            Software Development <span style={{ color: 'var(--color-gold)' }}>Bootcamp</span>
          </h1>
          <p className="font-body" style={{ fontSize: '18px', color: 'var(--color-text-secondary)', lineHeight: 1.8, maxWidth: '620px' }}>
           
          </p>

&quot;Ever found yourself halfway through a 3-hour YouTube tutorial only to quit because it just wasn&apos;t getting anywhere? You&apos;re not alone.

Today&apos;s developers are becoming too dependent on AI, copying code they don&apos;t fully understand. But when it&apos;s time for a technical interview or to solve a real-world problem, prompts won&apos;t save you,your knowledge will.

That&apos;s why we built this bootcamp. We don&apos;t just teach you how to write code; we teach you how to think like a software engineer. From rock-solid fundamentals to advanced concepts, you&apos;ll gain the skills, confidence, and experience that separate average developers from the ones companies fight to hire.The stuff
you won&apos;t even find in youtube tutorials or other bootcamps&quot;

        </div>
      </div>

      <CoursesClient />
    </div>
  );
}
