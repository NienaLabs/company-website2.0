import { notFound } from 'next/navigation';
import { courses, isEarlyBird, EARLY_BIRD_DEADLINE } from '../../../../lib/courses';
import Link from 'next/link';
import { ArrowLeft, Clock, BookOpen, Flame, Users } from 'lucide-react';
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

function formatDeadline(date: Date): string {
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const course = courses.find((c) => c.slug === resolvedParams.slug);

  if (!course) notFound();

  const earlyBird = isEarlyBird();
  const activePrice = earlyBird ? course.earlyBirdPrice : course.regularPrice;
  const crossedOutPrice = !course.isBundle && earlyBird ? course.regularPrice : null;
  const totalModules = course.phases.reduce((acc, p) => acc + p.modules.length, 0);

  return (
    <div style={{ background: 'var(--color-void)', minHeight: '100vh', paddingBottom: 'var(--space-10)' }}>

      {/* Navigation Bar */}
      <div className="section-container" style={{ padding: 'var(--space-6) 0', borderBottom: 'var(--border-hairline)' }}>
        <Link href="/bootcamp/courses" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <ArrowLeft size={12} /> Back to Programs
        </Link>
      </div>

      {/* Hero Section */}
      <div className="section-container" style={{ paddingTop: 'var(--space-9)', paddingBottom: 'var(--space-8)' }}>
        <div className="course-detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 'var(--space-8)', alignItems: 'start' }}>

          {/* Main Info */}
          <div>
            <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
              <div className="overline">{course.category === 'Bundle' ? 'All Tracks' : `${course.category} Track`}</div>
              <div className="overline" style={{ color: 'var(--color-text-muted)' }}>{course.level}</div>
            </div>

            <h1 className="font-cormorant" style={{ fontSize: '56px', fontWeight: 300, lineHeight: 1.1, color: 'var(--color-text-primary)', marginBottom: 'var(--space-6)' }}>
              {course.title}
            </h1>

            <p className="font-garamond" style={{ fontSize: '20px', color: 'var(--color-text-secondary)', lineHeight: 1.8, marginBottom: 'var(--space-8)' }}>
              {course.longDescription}
            </p>

            {/* Stats */}
            <div style={{ display: 'flex', gap: 'var(--space-6)', borderTop: 'var(--border-gold-faint)', borderBottom: 'var(--border-gold-faint)', padding: 'var(--space-5) 0', marginBottom: 'var(--space-8)', flexWrap: 'wrap' }}>
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
                  <div className="font-cinzel" style={{ fontSize: '9px', letterSpacing: '0.1em', color: 'var(--color-text-muted)' }}>Modules</div>
                  <div className="font-garamond" style={{ fontSize: '16px', color: 'var(--color-text-primary)' }}>{totalModules} topics</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Users size={18} color="var(--color-gold)" />
                <div>
                  <div className="font-cinzel" style={{ fontSize: '9px', letterSpacing: '0.1em', color: 'var(--color-text-muted)' }}>Sessions</div>
                  <div className="font-garamond" style={{ fontSize: '16px', color: 'var(--color-text-primary)' }}>{course.sessions}× per program</div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div style={{ marginBottom: 'var(--space-8)' }}>
              <div className="font-cinzel" style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: 'var(--space-4)' }}>
                Skills You&apos;ll Gain
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
                {course.skills.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: '9px',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      padding: 'var(--space-2) var(--space-4)',
                      borderRadius: 'var(--radius-tag)',
                      background: 'rgba(245,243,238,0.04)',
                      border: 'var(--border-subtle)',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Curriculum by Phase */}
            <h2 className="font-cormorant" style={{ fontSize: '32px', fontWeight: 300, color: 'var(--color-text-primary)', marginBottom: 'var(--space-6)' }}>
              Curriculum
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              {course.phases.map((phase) => (
                <div key={phase.phase} className="bento-cell" style={{ padding: 'var(--space-6)' }}>
                  <div style={{ marginBottom: 'var(--space-4)' }}>
                    <div className="font-cinzel" style={{ fontSize: '10px', color: 'var(--color-gold)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 'var(--space-2)' }}>
                      {phase.phase}
                    </div>
                    <p className="font-garamond" style={{ fontSize: '14px', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                      {phase.description}
                    </p>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                    {phase.modules.map((mod, i) => (
                      <li
                        key={i}
                        className="font-garamond"
                        style={{
                          fontSize: '15px',
                          color: 'var(--color-text-secondary)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          paddingBottom: 'var(--space-2)',
                          borderBottom: i < phase.modules.length - 1 ? 'var(--border-hairline)' : 'none',
                        }}
                      >
                        <span style={{ color: 'var(--color-gold)', fontSize: '12px', flexShrink: 0 }}>—</span>
                        <span>
                          {mod.title}
                          {mod.note && (
                            <span style={{ color: 'var(--color-text-muted)', fontSize: '13px', marginLeft: '6px' }}>
                              ({mod.note})
                            </span>
                          )}
                        </span>
                        {mod.shared && (
                          <span className="font-cinzel" style={{ fontSize: '8px', color: 'var(--color-text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginLeft: 'auto', flexShrink: 0 }}>
                            Shared
                          </span>
                        )}
                        {mod.isNew && (
                          <span className="font-cinzel" style={{ fontSize: '8px', color: 'var(--color-gold)', letterSpacing: '0.1em', textTransform: 'uppercase', marginLeft: 'auto', flexShrink: 0 }}>
                            New
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar / Enrollment Card */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <div className="bento-cell" style={{ padding: 'var(--space-6)', border: 'var(--border-gold-faint)', boxShadow: 'var(--shadow-3)' }}>

              <div className="font-cinzel" style={{ fontSize: '10px', color: 'var(--color-gold)', letterSpacing: '0.18em', marginBottom: 'var(--space-4)' }}>
                Enroll Now
              </div>

              {/* Price display */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: crossedOutPrice ? 'var(--space-3)' : 'var(--space-6)' }}>
                <div className="font-cormorant" style={{ fontSize: '48px', color: 'var(--color-text-primary)', lineHeight: 1 }}>
                  GH₵{activePrice}
                </div>
                {crossedOutPrice && (
                  <div className="font-garamond" style={{ fontSize: '20px', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>
                    GH₵{crossedOutPrice}
                  </div>
                )}
              </div>

              {/* Early bird notice */}
              {earlyBird && !course.isBundle && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(201,168,76,0.06)',
                  border: '1px solid rgba(201,168,76,0.2)',
                  borderRadius: 'var(--radius-tag)',
                  padding: 'var(--space-3) var(--space-4)',
                  marginBottom: 'var(--space-6)',
                }}>
                  <Flame size={12} color="var(--color-gold)" />
                  <span className="font-garamond" style={{ fontSize: '13px', color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>
                    Early bird price — ends {formatDeadline(EARLY_BIRD_DEADLINE)}
                  </span>
                </div>
              )}

              {course.isBundle && (
                <div style={{ marginBottom: 'var(--space-6)' }}>
                  <p className="font-garamond" style={{ fontSize: '13px', color: 'var(--color-text-secondary)', fontStyle: 'italic', lineHeight: 1.6 }}>
                    Fixed price — includes all three tracks (Web, Mobile & Backend).
                  </p>
                </div>
              )}

              <Link
                href={`/bootcamp/checkout?courseId=${course.id}`}
                className="btn-primary"
                style={{ display: 'block', textAlign: 'center', width: '100%', marginBottom: 'var(--space-5)', boxSizing: 'border-box' }}
              >
                Enroll in Program
              </Link>

              {/* Throughlines */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', borderTop: 'var(--border-hairline)', paddingTop: 'var(--space-5)' }}>
                {[
                  '2-month intensive program',
                  '3 sessions per week',
                  'Team-based final project',
                  'AI-native workflow training',
                ].map((point) => (
                  <div key={point} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: 'var(--color-gold)', fontSize: '14px' }}>—</span>
                    <span className="font-garamond" style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>{point}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .course-detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
