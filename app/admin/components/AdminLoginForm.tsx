'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Typography } from '@/app/components/ui/Typography';
import { Lock } from 'lucide-react';

export function AdminLoginForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        // Force a hard reload to ensure middleware picks up the cookie and redirects properly
        window.location.href = '/admin/posts';
      } else {
        const data = await res.json();
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4">
      <div className="w-full max-w-md p-8 rounded-[var(--radius-3xl)] bg-[var(--surface)] border border-[var(--border)] shadow-[var(--shadow-panel)]">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-12 h-12 bg-[var(--color-brand)] rounded-[var(--radius-xl)] flex items-center justify-center text-[var(--color-bg)] mb-4">
            <Lock size={24} />
          </div>
          <Typography variant="title2" as="h1">
            Admin Login
          </Typography>
          <Typography variant="body2" className="text-[var(--text-muted)] mt-2">
            Enter the admin password to access the dashboard.
          </Typography>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password..."
              className="input-field w-full"
              required
              autoFocus
            />
          </div>

          {error && (
            <div className="text-[var(--color-danger)] text-sm font-medium text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full h-[48px] flex items-center justify-center"
            style={{ borderRadius: 'var(--radius-full)' }}
          >
            {loading ? 'Verifying...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
