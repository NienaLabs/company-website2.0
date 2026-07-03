import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Course } from '../../../lib/courses';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="bento-cell" style={{ display: 'flex', flexDirection: 'column', padding: 'var(--space-6)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
        <div className="overline">{course.category}</div>
        {course.badge && (
          <div style={{
            fontSize: '9px',
            fontFamily: "'Cinzel', serif",
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            padding: 'var(--space-2) var(--space-3)',
            borderRadius: 'var(--radius-tag)',
            background: 'rgba(201,168,76,0.12)',
            border: 'var(--border-gold)',
            color: 'var(--color-gold)'
          }}>
            {course.badge}
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1 }}>
        <h3 className="font-cormorant" style={{ fontSize: '28px', color: 'var(--color-text-primary)', marginBottom: 'var(--space-4)', lineHeight: 1.2 }}>
          {course.title}
        </h3>
        <p className="font-garamond" style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)', lineHeight: 1.7 }}>
          {course.description}
        </p>
        
        <div className="font-cinzel" style={{ fontSize: '10px', color: 'var(--color-text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 'var(--space-6)' }}>
          <span>{course.duration}</span>
          <span style={{ margin: '0 var(--space-3)' }}>·</span>
          <span>{course.level}</span>
        </div>
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: 'var(--border-hairline)', paddingTop: 'var(--space-4)', marginTop: 'auto' }}>
        <div className="font-garamond" style={{ fontSize: '18px', color: 'var(--color-text-primary)' }}>
          GH₵{course.price}
        </div>
        <Link
          href={`/bootcamp/courses/${course.slug}`}
          className="btn-secondary"
          id={`course-card-${course.id}`}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          View Program <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
}
