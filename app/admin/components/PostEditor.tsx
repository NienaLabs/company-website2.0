'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TipTapEditor } from './TipTapEditor';
import type { JSONContent } from '@tiptap/core';
import type { BlogPostMeta } from '@/lib/blog';
import { Typography } from '@/app/components/ui/Typography';
import { ArrowLeft, Save, Loader2, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface PostEditorProps {
  initialMeta?: Partial<BlogPostMeta>;
  initialContent?: JSONContent;
  isNew?: boolean;
}

const defaultContent: JSONContent = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [{ type: 'text', text: 'Start writing your amazing post here...' }],
    },
  ],
};

const defaultMeta: Partial<BlogPostMeta> = {
  title: '',
  slug: '',
  excerpt: '',
  author: 'Niena Labs Team',
  category: 'Engineering',
  tags: [],
  coverImage: '',
  draft: true,
  featured: false,
};

export function PostEditor({ initialMeta, initialContent, isNew = false }: PostEditorProps) {
  const [meta, setMeta] = useState<Partial<BlogPostMeta>>({ ...defaultMeta, ...initialMeta });
  const [content, setContent] = useState<JSONContent>(initialContent || defaultContent);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const router = useRouter();

  const handleMetaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setMeta((prev) => ({ ...prev, [name]: val }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsArray = e.target.value.split(',').map(t => t.trim()).filter(Boolean);
    setMeta((prev) => ({ ...prev, tags: tagsArray }));
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingCover(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      // Use the slug or title (slugified later) for the folder
      formData.append('slug', meta.slug || meta.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'draft');

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Upload failed with status ${res.status}`);
      }
      const data = await res.json();
      
      setMeta(prev => ({ ...prev, coverImage: data.url }));
    } catch (error: any) {
      console.error('Cover upload error:', error);
      alert(`Cover upload failed: ${error.message}`);
    } finally {
      setIsUploadingCover(false);
    }
  };

  const handleSave = async () => {
    if (!meta.title) {
      alert('Title is required');
      return;
    }

    if (!meta.coverImage) {
      alert('Cover image is required');
      return;
    }

    setIsSaving(true);

    try {
      const url = isNew 
        ? '/api/admin/posts' 
        : `/api/admin/posts/${initialMeta?.slug}`;
        
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ meta, content }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to save post');
      }

      router.push('/admin/posts');
      router.refresh(); // Ensure the list updates
    } catch (error: any) {
      alert(`Error saving post: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[var(--bg)] relative">
      {/* Top Bar */}
      <header className="sticky top-0 z-10 bg-[var(--surface-glass-strong)] backdrop-blur-md border-b border-[var(--border)] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/posts" className="p-2 rounded-full hover:bg-[var(--surface-2)] transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <Typography variant="title3" as="h1">
            {isNew ? 'Create New Post' : 'Edit Post'}
          </Typography>
          {meta.draft ? (
            <span className="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[var(--color-surface-raised)] border border-[var(--border)] text-[var(--text-secondary)]">
              Draft
            </span>
          ) : (
            <span className="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#1a2e1d] text-[#4caf50] border border-[rgba(76,175,80,0.2)]">
              Published
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-[var(--text-secondary)]">
            <input 
              type="checkbox" 
              name="draft" 
              checked={!!meta.draft} 
              onChange={handleMetaChange}
              className="w-4 h-4 rounded border-[var(--border)] text-[var(--amber)] focus:ring-[var(--amber)] bg-[var(--surface-2)]"
            />
            Save as Draft
          </label>
          <button 
            onClick={handleSave} 
            disabled={isSaving}
            className="btn-primary flex items-center gap-2"
            style={{ borderRadius: 'var(--radius-full)' }}
          >
            {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {isSaving ? 'Saving...' : 'Save Post'}
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Editor Area */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <input
                type="text"
                name="title"
                placeholder="Post Title..."
                value={meta.title}
                onChange={handleMetaChange}
                className="w-full bg-transparent border-none text-4xl font-display font-semibold text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-0 p-0"
              />
            </div>

            <div className="flex flex-col gap-2">
              <textarea
                name="excerpt"
                placeholder="Brief excerpt or description..."
                value={meta.excerpt}
                onChange={handleMetaChange}
                rows={2}
                className="w-full bg-transparent border-none text-lg text-[var(--text-secondary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-0 p-0 resize-none"
              />
            </div>

            {/* TipTap Editor */}
            <div className="mt-4">
              <TipTapEditor 
                initialContent={content} 
                onChange={setContent} 
                slug={meta.slug || meta.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'draft'} 
              />
            </div>
          </div>

          {/* Sidebar Settings Area */}
          <aside className="space-y-6">
            {/* Cover Image Panel */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-xl)] p-5 shadow-sm">
              <Typography variant="body1" className="font-semibold mb-4 flex items-center gap-2">
                <ImageIcon size={18} className="text-[var(--text-muted)]" />
                Cover Image
              </Typography>
              
              <div className="relative w-full aspect-video rounded-[var(--radius-lg)] overflow-hidden bg-[var(--surface-2)] border border-dashed border-[var(--border-strong)] flex flex-col items-center justify-center group mb-4">
                {meta.coverImage ? (
                  <>
                    <Image src={meta.coverImage} alt="Cover" fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <label className="btn-secondary text-sm cursor-pointer" style={{ borderRadius: 'var(--radius-full)' }}>
                        Change Image
                        <input type="file" className="hidden" accept="image/*" onChange={handleCoverUpload} />
                      </label>
                    </div>
                  </>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer hover:bg-[var(--surface-3)] transition-colors p-4 text-center">
                    {isUploadingCover ? (
                      <Loader2 className="w-8 h-8 text-[var(--text-muted)] animate-spin mb-2" />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-[var(--text-muted)] mb-2" />
                    )}
                    <span className="text-sm font-medium text-[var(--text-secondary)]">
                      {isUploadingCover ? 'Uploading...' : 'Click to upload cover image'}
                    </span>
                    <span className="text-xs text-[var(--text-muted)] mt-1">
                      16:9 ratio recommended
                    </span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleCoverUpload} disabled={isUploadingCover} />
                  </label>
                )}
              </div>
            </div>

            {/* Meta Details Panel */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-xl)] p-5 shadow-sm space-y-4">
              <Typography variant="body1" className="font-semibold mb-2">
                Post Details
              </Typography>

              <div>
                <label className="block text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">Slug (URL)</label>
                <input
                  type="text"
                  name="slug"
                  value={meta.slug}
                  onChange={handleMetaChange}
                  disabled={!isNew}
                  placeholder="auto-generated-from-title"
                  className="input-field w-full text-sm disabled:opacity-50"
                />
                {!isNew && <span className="text-[10px] text-[var(--text-muted)]">Slug cannot be changed after creation.</span>}
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">Category</label>
                <select 
                  name="category" 
                  value={meta.category} 
                  onChange={handleMetaChange}
                  className="input-field w-full text-sm"
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Design">Design</option>
                  <option value="Company">Company</option>
                  <option value="Product">Product</option>
                  <option value="AI">AI</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  value={meta.tags?.join(', ') || ''}
                  onChange={handleTagsChange}
                  placeholder="e.g. Next.js, React, UI"
                  className="input-field w-full text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">Author Name</label>
                <input
                  type="text"
                  name="author"
                  value={meta.author || ''}
                  onChange={handleMetaChange}
                  placeholder="e.g. NienaLabs Team"
                  className="input-field w-full text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">Author Profile URL (GitHub/LinkedIn)</label>
                <input
                  type="url"
                  name="authorProfile"
                  value={meta.authorProfile || ''}
                  onChange={handleMetaChange}
                  placeholder="e.g. https://github.com/..."
                  className="input-field w-full text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">Author Role (Position)</label>
                <input
                  type="text"
                  name="authorRole"
                  value={meta.authorRole || ''}
                  onChange={handleMetaChange}
                  placeholder="e.g. Lead Engineer"
                  className="input-field w-full text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">Reading Time (Minutes)</label>
                <input
                  type="number"
                  name="readingTime"
                  value={meta.readingTime || 5}
                  onChange={handleMetaChange}
                  min="1"
                  className="input-field w-full text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">Card Theme</label>
                <select 
                  name="cardTheme" 
                  value={meta.cardTheme || 'default'} 
                  onChange={handleMetaChange}
                  className="input-field w-full text-sm"
                >
                  <option value="default">Default (White Outlined)</option>
                  <option value="1">Dynamic 1 (Amber)</option>
                  <option value="2">Dynamic 2 (Warm Green)</option>
                  <option value="3">Dynamic 3 (Blue-Violet)</option>
                  <option value="4">Dynamic 4 (Teal/Purple)</option>
                </select>
              </div>
            </div>

            {/* Visibility Panel */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-xl)] p-5 shadow-sm">
              <Typography variant="body1" className="font-semibold mb-4">
                Visibility
              </Typography>
              
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-[var(--surface-2)] transition-colors border border-transparent hover:border-[var(--border)]">
                <input 
                  type="checkbox" 
                  name="featured" 
                  checked={!!meta.featured} 
                  onChange={handleMetaChange}
                  className="w-5 h-5 rounded border-[var(--border)] text-[var(--amber)] focus:ring-[var(--amber)] bg-[var(--surface-3)]"
                />
                <div>
                  <div className="text-sm font-medium">Featured Post</div>
                  <div className="text-xs text-[var(--text-muted)]">Display at the top of the blog index</div>
                </div>
              </label>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}
