import { Activity } from 'lucide-react';
import type { Metadata } from 'next';
import { Typography } from '../../components/ui/Typography';

export const metadata: Metadata = {
  title: 'Bootcamp — Niena Labs',
  description: 'Our Software Development Bootcamp is currently ongoing.',
};

export default function CoursesPage() {
  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>      {/* Centered Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'var(--spacing-8)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px', textAlign: 'center' }}>
          {/* Glowing Icon Container */}
          <div style={{ 
            padding: '24px', 
            borderRadius: '50%', 
            background: 'var(--color-brand-subtle)', 
            border: '1px solid var(--color-brand)', 
            color: 'var(--color-brand)', 
            display: 'inline-flex',
            boxShadow: '0 0 40px var(--amber-glow)'
          }}>
            <Activity size={48} strokeWidth={1.5} />
          </div>
          
          <Typography variant="display" color="primary" style={{ maxWidth: '900px' }}>
            Bootcamp currently <span style={{ color: 'var(--color-brand)' }}>ongoing</span>
          </Typography>
          
          <Typography variant="body1" color="muted" style={{ marginTop: '-12px' }}>
            Registrations are currently closed.
          </Typography>
        </div>
      </div>
    </div>
  );
}
