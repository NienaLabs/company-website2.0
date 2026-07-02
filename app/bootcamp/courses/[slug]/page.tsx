import { notFound } from 'next/navigation';
import { courses } from '../../../../lib/courses';
import Link from 'next/link';
import { ArrowLeft, Clock, BookOpen, Star, User } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const course = courses.find((c) => c.slug === resolvedParams.slug);
  if (!course) return { title: 'Course Not Found' };
  return {
    title: `${course.title} — Niena Labs Bootcamp`,
    description: course.description,
  };
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const course = courses.find((c) => c.slug === resolvedParams.slug);

  if (!course) {
    notFound();
  }

  return (
    <div style={{ background: 'var(--color-void)', minHeight: '100vh', paddingBottom: 'var(--space-10)', paddingLeft: 'var(--space-6)' }}>
      {/* Navigation Bar */}
      <div className="section-container" style={{ padding: 'var(--space-6) 0', borderBottom: 'var(--border-hairline)' }}>
        <Link href="/bootcamp/courses" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <ArrowLeft size={12} /> Back to Programs
        </Link>
      </div>

      {/* Hero Section */}
      <div className="section-container" style={{ paddingTop: 'var(--space-9)', paddingBottom: 'var(--space-8)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 'var(--space-8)', alignItems: 'start' }}>

          {/* Main Info */}
          <div>
            <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
              <div className="overline">{course.category}</div>
              <div className="overline" style={{ color: 'var(--color-text-muted)' }}>{course.level}</div>
            </div>

            <h1 className="font-cormorant" style={{ fontSize: '56px', fontWeight: 300, lineHeight: 1.1, color: 'var(--color-text-primary)', marginBottom: 'var(--space-6)' }}>
              {course.title}
            </h1>

            <p className="font-garamond" style={{ fontSize: '20px', color: 'var(--color-text-secondary)', lineHeight: 1.8, marginBottom: 'var(--space-8)' }}>
              {course.longDescription}
            </p>

            <div style={{ display: 'flex', gap: 'var(--space-6)', borderTop: 'var(--border-gold-faint)', borderBottom: 'var(--border-gold-faint)', padding: 'var(--space-5) 0', marginBottom: 'var(--space-8)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Clock size={18} color="var(--color-gold)" />
                <div>
                  <div className="font-cinzel" style={{ fontSize: '9px', letterSpacing: '0.1em', color: 'var(--color-text-muted)' }}>Duration</div>
                  <div className="font-garamond" style={{ fontSize: '16px', color: 'var(--color-text-primary)' }}>{course.duration}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <BookOpen size={18} color="var(--color-gold)" />
                <div>
                  <div className="font-cinzel" style={{ fontSize: '9px', letterSpacing: '0.1em', color: 'var(--color-text-muted)' }}>Lessons</div>
                  <div className="font-garamond" style={{ fontSize: '16px', color: 'var(--color-text-primary)' }}>{course.lessons} Total</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Star size={18} color="var(--color-gold)" />
                <div>
                  <div className="font-cinzel" style={{ fontSize: '9px', letterSpacing: '0.1em', color: 'var(--color-text-muted)' }}>Rating</div>
                  <div className="font-garamond" style={{ fontSize: '16px', color: 'var(--color-text-primary)' }}>{course.rating} / 5.0</div>
                </div>
              </div>
            </div>

            {/* Curriculum */}
            <h2 className="font-cormorant" style={{ fontSize: '32px', fontWeight: 300, color: 'var(--color-text-primary)', marginBottom: 'var(--space-6)' }}>
              Curriculum Overview
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {course.curriculum.map((module) => (
                <div key={module.week} className="bento-cell" style={{ padding: 'var(--space-5)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 'var(--space-3)' }}>
                    <h3 className="font-garamond" style={{ fontSize: '20px', color: 'var(--color-text-primary)' }}>
                      {module.title}
                    </h3>
                    <span className="font-cinzel" style={{ fontSize: '10px', color: 'var(--color-gold)' }}>Week {module.week}</span>
                  </div>
                  <ul className="font-garamond" style={{ color: 'var(--color-text-secondary)', fontSize: '15px', paddingLeft: '20px', margin: 0 }}>
                    {module.topics.map((topic, i) => (
                      <li key={i} style={{ paddingBottom: '4px' }}>{topic}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar / Enrollment Card */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <div className="bento-cell" style={{ padding: 'var(--space-6)', border: 'var(--border-gold-faint)', boxShadow: 'var(--shadow-3)' }}>
              <div className="font-cinzel" style={{ fontSize: '10px', color: 'var(--color-gold)', letterSpacing: '0.18em', marginBottom: 'var(--space-4)' }}>Enroll Now</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: 'var(--space-6)' }}>
                <div className="font-cormorant" style={{ fontSize: '48px', color: 'var(--color-text-primary)', lineHeight: 1 }}>
                  GH₵{course.price}
                </div>
                {course.originalPrice && (
                  <div className="font-garamond" style={{ fontSize: '20px', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>
                    GH₵{course.originalPrice}
                  </div>
                )}
              </div>

              <Link href={`/bootcamp/checkout?courseId=${course.id}`} className="btn-primary" style={{ display: 'block', textAlign: 'center', width: '100%', marginBottom: 'var(--space-5)' }}>
                Enroll in Program
              </Link>


            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
