'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Loader2 } from 'lucide-react';

export function DeletePostButton({ slug, title }: { slug: string; title: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete "${title}"? This cannot be undone and will permanently delete all associated images.`)) {
      return;
    }

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/employees/posts/${slug}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete post');
      }

      router.refresh(); // Refresh the page to remove the deleted post
    } catch (error: any) {
      alert(`Error deleting post: ${error.message}`);
      setIsDeleting(false);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 text-[var(--text-secondary)] hover:text-[var(--color-error)] hover:bg-[rgba(244,67,54,0.1)] rounded-md transition-colors disabled:opacity-50"
      title="Delete Post"
    >
      {isDeleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
    </button>
  );
}
