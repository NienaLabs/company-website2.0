'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import type { JSONContent } from '@tiptap/core';
import { getSharedExtensions } from '@/lib/tiptap-extensions';
import { 
  Bold, Italic, Strikethrough, Code, Heading2, Heading3, 
  Quote, List, ListOrdered, Image as ImageIcon, Link2, 
  Table as TableIcon, Paperclip
} from 'lucide-react';
import { useState, useRef } from 'react';
import { Typography } from '@/app/components/ui/Typography';

interface TipTapEditorProps {
  initialContent: JSONContent;
  onChange: (content: JSONContent) => void;
  slug: string;
}

export function TipTapEditor({ initialContent, onChange, slug }: TipTapEditorProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const genericFileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: getSharedExtensions(),
    content: initialContent,
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
    editorProps: {
      attributes: {
        class: 'max-w-none min-h-[500px] focus:outline-none blog-prose p-6',
      },
    },
  });

  if (!editor) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (genericFileInputRef.current) {
      genericFileInputRef.current.value = '';
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('slug', slug || 'draft');

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Upload failed with status ${res.status}`);
      }

      const data = await res.json();
      
      if (data.url) {
        const { state } = editor;
        const { from, to } = state.selection;
        
        if (from === to) {
          editor.chain().focus().insertContent(`<a href="${data.url}">${file.name}</a>`).run();
        } else {
          editor.chain().focus().setLink({ href: data.url }).run();
        }
      }
    } catch (error: any) {
      console.error('File upload failed', error);
      alert(`Failed to upload file: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('slug', slug || 'draft'); // use 'draft' if slug isn't set yet

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Upload failed with status ${res.status}`);
      }

      const data = await res.json();
      
      // Insert image into editor
      if (data.url) {
        editor.chain().focus().setImage({ src: data.url }).run();
      }
    } catch (error: any) {
      console.error('Image upload failed', error);
      alert(`Failed to upload image: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const addLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) return;

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const ToolbarButton = ({ 
    isActive, 
    onClick, 
    children,
    title 
  }: { 
    isActive?: boolean, 
    onClick: () => void, 
    children: React.ReactNode,
    title?: string
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-2 rounded-md flex items-center justify-center transition-colors ${
        isActive 
          ? 'bg-[var(--amber)] text-[var(--color-bg)]' 
          : 'text-[var(--text-secondary)] hover:bg-[var(--surface-3)] hover:text-[var(--text-primary)]'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="border border-[var(--border)] rounded-[var(--radius-xl)] overflow-hidden bg-[var(--surface)] shadow-sm flex flex-col">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-[var(--border)] bg-[var(--surface-2)]">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          title="Bold"
        >
          <Bold size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          title="Italic"
        >
          <Italic size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive('strike')}
          title="Strikethrough"
        >
          <Strikethrough size={16} />
        </ToolbarButton>
        
        <div className="w-px h-6 bg-[var(--border)] mx-1" />
        
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
          title="Heading 2"
        >
          <Heading2 size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive('heading', { level: 3 })}
          title="Heading 3"
        >
          <Heading3 size={16} />
        </ToolbarButton>
        
        <div className="w-px h-6 bg-[var(--border)] mx-1" />
        
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          title="Bullet List"
        >
          <List size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          title="Ordered List"
        >
          <ListOrdered size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
          title="Blockquote"
        >
          <Quote size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive('codeBlock')}
          title="Code Block"
        >
          <Code size={16} />
        </ToolbarButton>
        
        <div className="w-px h-6 bg-[var(--border)] mx-1" />
        
        <ToolbarButton onClick={addLink} isActive={editor.isActive('link')} title="Link">
          <Link2 size={16} />
        </ToolbarButton>
        
        {/* Hidden file input for image upload */}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleImageUpload} 
          accept="image/*" 
          className="hidden" 
        />
        <ToolbarButton 
          onClick={() => fileInputRef.current?.click()} 
          title="Upload Image"
        >
          <div className="relative">
            <ImageIcon size={16} />
            {uploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-[var(--surface-2)]/80 rounded-sm">
                <div className="w-3 h-3 border-2 border-[var(--amber)] border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
        </ToolbarButton>

        {/* Hidden file input for generic file upload */}
        <input 
          type="file" 
          ref={genericFileInputRef} 
          onChange={handleFileUpload} 
          className="hidden" 
        />
        <ToolbarButton 
          onClick={() => genericFileInputRef.current?.click()} 
          title="Attach File"
        >
          <div className="relative">
            <Paperclip size={16} />
            {uploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-[var(--surface-2)]/80 rounded-sm">
                <div className="w-3 h-3 border-2 border-[var(--amber)] border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
        </ToolbarButton>

        <ToolbarButton 
          onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
          title="Insert Table"
        >
          <TableIcon size={16} />
        </ToolbarButton>
      </div>
      
      {/* Editor Content Area */}
      <div className="flex-1 bg-[var(--bg)] cursor-text" onClick={() => editor.chain().focus().run()}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
