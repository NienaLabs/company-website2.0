import Link from 'next/link';
import Image from 'next/image';
import { getBlogPosts } from '@/lib/blog';
import { Typography } from '@/app/components/ui/Typography';
import { Plus, Edit } from 'lucide-react';
import { DeletePostButton } from '../components/DeletePostButton';

export default async function AdminPostsPage() {
  // getBlogPosts handles sorting by date descending
  const posts = await getBlogPosts();

  return (
    <div className="p-8 max-w-5xl mx-auto w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Typography variant="title2" as="h1">
            Blog Posts
          </Typography>
          <Typography variant="body2" className="text-[var(--text-muted)]">
            Manage your blog content.
          </Typography>
        </div>
        
        <Link 
          href="/admin/posts/new" 
          className="btn-primary flex items-center gap-2"
          style={{ borderRadius: 'var(--radius-full)' }}
        >
          <Plus size={16} />
          New Post
        </Link>
      </div>

      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-panel)]">
        {posts.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-[var(--surface-2)] rounded-full flex items-center justify-center mb-4 text-[var(--text-muted)]">
              <Edit size={24} />
            </div>
            <Typography variant="title3">No posts yet</Typography>
            <Typography variant="body2" className="text-[var(--text-muted)] mb-6 max-w-sm">
              You haven't written any blog posts yet. Click the button below to create your first one.
            </Typography>
            <Link 
              href="/admin/posts/new" 
              className="btn-primary flex items-center gap-2"
              style={{ borderRadius: 'var(--radius-full)' }}
            >
              <Plus size={16} />
              Create First Post
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[var(--surface-2)] border-b border-[var(--border)]">
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Post</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Date</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {posts.map((post) => (
                  <tr key={post.slug} className="hover:bg-[var(--surface-2)] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 relative rounded-md overflow-hidden bg-[var(--surface-3)] flex-shrink-0">
                          <Image 
                            src={post.coverImage || 'https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2475&auto=format&fit=crop'} 
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <Link href={`/admin/posts/${post.slug}`} className="font-semibold text-[var(--text-primary)] hover:text-[var(--color-brand)] transition-colors">
                            {post.title}
                          </Link>
                          <div className="text-xs text-[var(--text-muted)] mt-1 truncate max-w-xs">
                            {post.category} • {post.readingTime} min read
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {post.draft ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--color-surface-raised)] border border-[var(--border)] text-[var(--text-secondary)]">
                          Draft
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#1a2e1d] text-[#4caf50] border border-[rgba(76,175,80,0.2)]">
                          Published
                        </span>
                      )}
                      {post.featured && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[rgba(224,209,46,0.1)] text-[var(--color-brand)] border border-[rgba(224,209,46,0.2)] ml-2">
                          Featured
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-[var(--text-secondary)]">
                      {new Intl.DateTimeFormat('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      }).format(new Date(post.date))}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/admin/posts/${post.slug}`}
                          className="p-2 text-[var(--text-secondary)] hover:text-[var(--color-brand)] hover:bg-[rgba(224,209,46,0.1)] rounded-md transition-colors"
                          title="Edit Post"
                        >
                          <Edit size={16} />
                        </Link>
                        <DeletePostButton slug={post.slug} title={post.title} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
