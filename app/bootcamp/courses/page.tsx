import { courses } from '../../../lib/courses';
import CoursesClient from '../../components/bootcamp/CoursesClient';
import { BookOpen, ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'All Courses — Niena Labs Bootcamp',
  description: 'Browse all bootcamp programs. Web Development, Data Science, AI, Design, Marketing, Cybersecurity and more.',
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
            Find Your <span style={{ color: 'var(--color-gold)' }}>Bootcamp</span>
          </h1>
          <p className="font-garamond" style={{ fontSize: '18px', color: 'var(--color-text-secondary)', lineHeight: 1.8, maxWidth: '620px' }}>
            6 intensive, career-transforming programs designed by industry experts. 
            Find the course that matches your goals.
          </p>
        </div>
      </div>

      <CoursesClient />
    </div>
  );
}
