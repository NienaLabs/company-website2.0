import Link from 'next/link';
import { PenSquare, FileText, Settings, LogOut, Image as ImageIcon } from 'lucide-react';
import { Typography } from '@/app/components/ui/Typography';

export function AdminSidebar() {
  return (
    <aside className="w-64 bg-[var(--color-surface-raised)] border-r border-[var(--color-border)] h-screen sticky top-0 flex flex-col hidden md:flex">
      <div className="p-6 border-b border-[var(--color-border)]">
        <Typography variant="title2" className="text-[var(--color-brand)] flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[var(--color-brand)] flex items-center justify-center text-[var(--color-bg)] font-bold text-sm">
            NL
          </div>
          Admin
        </Typography>
      </div>

      <nav className="flex-1 p-4 flex flex-col gap-2">
        <Typography variant="caption1" className="text-[var(--text-muted)] uppercase tracking-wider mb-2 px-2">
          Content
        </Typography>

        <Link 
          href="/admin/posts" 
          className="flex items-center gap-3 px-3 py-2 rounded-[var(--radius-md)] text-[var(--text-secondary)] hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)] transition-colors"
        >
          <FileText size={18} />
          <span>Posts</span>
        </Link>
        
        <Link 
          href="/admin/posts/new" 
          className="flex items-center gap-3 px-3 py-2 rounded-[var(--radius-md)] text-[var(--text-secondary)] hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)] transition-colors"
        >
          <PenSquare size={18} />
          <span>New Post</span>
        </Link>

        {/* Media library could go here later */}
      </nav>

      <div className="p-4 border-t border-[var(--color-border)]">
        <form action="/api/admin/logout" method="POST">
          <button 
            type="submit"
            className="w-full flex items-center gap-3 px-3 py-2 rounded-[var(--radius-md)] text-[var(--text-secondary)] hover:bg-[var(--surface-2)] hover:text-[var(--color-danger)] transition-colors"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
