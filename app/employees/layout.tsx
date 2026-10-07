import { AdminSidebar } from './components/AdminSidebar';
import { validateAdminSession } from '@/lib/admin-auth';

export const metadata = {
  title: 'Employees Dashboard — Niena Labs',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isSignedIn = await validateAdminSession();

  return (
    <div className="flex min-h-screen bg-[var(--bg)] text-[var(--text-primary)] font-['Inter',_sans-serif]">
      {isSignedIn && <AdminSidebar />}
      <main className="flex-1 flex flex-col min-w-0">
        {children}
      </main>
    </div>
  );
}
