import { AdminSidebar } from './components/AdminSidebar';

export const metadata = {
  title: 'Admin Dashboard — Niena Labs',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[var(--bg)] text-[var(--text-primary)] font-['Inter',_sans-serif]">
      {/* 
        Note: We conditionally render the sidebar based on auth status 
        in a real app, or via middleware protection. The middleware.ts 
        already ensures only authenticated users see this layout.
      */}
      <AdminSidebar />
      <main className="flex-1 flex flex-col min-w-0">
        {children}
      </main>
    </div>
  );
}
