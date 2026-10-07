'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Typography } from '@/app/components/ui/Typography';
import Image from 'next/image';

export function AdminLoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/employees/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        // Force a hard reload to ensure middleware picks up the cookie and redirects properly
        window.location.href = '/employees/posts';
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
    <main className="login-page">
      <div className="login-card">
        <div className="login-watermark" aria-hidden="true">
          <Image src="/logo-black.svg" alt="" width={400} height={400} priority />
        </div>

        <header className="login-header">
          <Typography variant="title2" as="h1">
            Employee Login
          </Typography>
          <Typography variant="body2" className="login-subtitle">
            Sign in with your Niena Labs credentials to continue.
          </Typography>
        </header>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field">
            <label htmlFor="employee-username" className="login-label">
              Username
            </label>
            <input
              id="employee-username"
              name="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="input-field login-input"
              required
              autoFocus
            />
          </div>

          <div className="login-field">
            <label htmlFor="employee-password" className="login-label">
              Password
            </label>
            <input
              id="employee-password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="input-field login-input"
              required
            />
          </div>

          {error && (
            <div role="alert" className="login-error">
              {error}
            </div>
          )}

          <button
            id="employee-login-submit"
            type="submit"
            disabled={loading}
            className="btn-primary login-submit"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="login-footer">Authorised personnel only.</p>
      </div>
    </main>
  );
}
