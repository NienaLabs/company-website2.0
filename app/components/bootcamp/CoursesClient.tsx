'use client';

import { useState } from 'react';
import { courses } from '../../../lib/courses';
import CourseCard from './CourseCard';
import { Filter } from 'lucide-react';

const categories = ['All', 'Development', 'Data', 'AI', 'Design', 'Marketing', 'Security'];
const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];

export default function CoursesClient() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredCourses = courses.filter((course) => {
    if (activeCategory === 'All') return true;
    return course.category === activeCategory;
  });

  return (
    <>
      {/* Filters */}
      <div className="section-container" style={{ paddingTop: 'var(--space-6)', paddingBottom: 'var(--space-6)', borderBottom: 'var(--border-hairline)', marginBottom: 'var(--space-9)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-6)', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
            <Filter size={14} color="var(--color-gold)" />
            <span className="font-cinzel" style={{ fontSize: '10px', color: 'var(--color-gold)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Category:</span>
            <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  id={`filter-category-${cat.toLowerCase()}`}
                  style={{
                    background: cat === activeCategory ? 'rgba(201,168,76,0.1)' : 'transparent',
                    border: cat === activeCategory ? 'var(--border-gold)' : 'var(--border-subtle)',
                    color: cat === activeCategory ? 'var(--color-gold)' : 'var(--color-text-secondary)',
                    fontFamily: "'Cinzel', serif",
                    fontSize: '9px',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    padding: 'var(--space-2) var(--space-4)',
                    borderRadius: 'var(--radius-tag)',
                    cursor: 'pointer',
                    transition: 'all 150ms ease'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="section-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
          <span className="font-garamond" style={{ fontSize: '14px', fontStyle: 'italic', color: 'var(--color-text-muted)' }}>
            {filteredCourses.length} courses found
          </span>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 'var(--space-6)'
        }}>
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </>
  );
}
