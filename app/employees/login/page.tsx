import { AdminLoginForm } from '../components/AdminLoginForm';

// Note: This page needs to bypass the admin layout so the sidebar doesn't show up.
// Wait, actually Next.js layouts wrap nested pages. Since this is app/employees/login/page.tsx, 
// it WILL be wrapped by app/employees/layout.tsx.
// We need to fix this. To have a different layout for login, we should either:
// 1. Put login at app/admin-login/page.tsx OR
// 2. Make the layout conditionally render the sidebar if not on /login OR
// 3. Move the protected routes into a route group like app/employees/(protected)/.

// For now, let's just make the sidebar hidden on the login page via CSS class 
// on the body, or we'll refactor the layout structure.

export const metadata = {
  title: 'Employee Login — Niena Labs',
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return <AdminLoginForm />;
}
