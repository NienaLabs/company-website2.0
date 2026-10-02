/**
 * Blog data access layer.
 *
 * Reads blog posts stored as JSON files in content/blogs/.
 * Each file contains { meta: BlogPostMeta, content: TipTapJSON }.
 */

import fs from 'fs';
import path from 'path';
import type { JSONContent } from '@tiptap/core';

const blogsDirectory = path.join(process.cwd(), 'content', 'blogs');

// ── Types ──────────────────────────────────────────────────────────────────

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  updatedAt?: string;
  excerpt: string;
  author: string;
  authorRole?: string;
  authorAvatar?: string;
  authorProfile?: string;
  coverImage: string;
  tags: string[];
  category: string;
  cardTheme?: 'default' | '1' | '2' | '3' | '4';
  readingTime: number;
  featured: boolean;
  draft: boolean;
}

export interface BlogPost {
  meta: BlogPostMeta;
  content: JSONContent;
}

export interface TableOfContentsItem {
  id: string;
  text: string;
  level: 2 | 3;
}

// ── Text Extraction ────────────────────────────────────────────────────────

/**
 * Recursively extracts plain text from a TipTap JSON node tree.
 */
export function extractText(node: JSONContent): string {
  if (node.type === 'text') return node.text || '';
  if (!node.content) return '';
  return node.content.map(extractText).join(' ');
}

// ── Reading Time ───────────────────────────────────────────────────────────

export function calculateReadingTime(content: JSONContent): number {
  const text = extractText(content);
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

// ── Table of Contents Extraction ───────────────────────────────────────────

/**
 * Walks the TipTap JSON tree and extracts all h2/h3 headings
 * with slugified IDs for anchor links.
 */
export function extractHeadings(content: JSONContent): TableOfContentsItem[] {
  const headings: TableOfContentsItem[] = [];

  function walk(node: JSONContent) {
    if (
      node.type === 'heading' &&
      node.attrs &&
      (node.attrs.level === 2 || node.attrs.level === 3)
    ) {
      const text = extractText(node);
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      if (id && text) {
        headings.push({ id, text, level: node.attrs.level as 2 | 3 });
      }
    }
    node.content?.forEach(walk);
  }

  walk(content);
  return headings;
}

// ── Slug Generation ────────────────────────────────────────────────────────

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// ── Data Access ────────────────────────────────────────────────────────────

/**
 * Returns all blog post metadata, sorted by date descending.
 * Filters out drafts in production.
 */
export async function getBlogPosts(): Promise<BlogPostMeta[]> {
  if (!fs.existsSync(blogsDirectory)) return [];

  const isProduction = process.env.NODE_ENV === 'production';
  const fileNames = fs.readdirSync(blogsDirectory).filter(f => f.endsWith('.json'));

  const posts = fileNames.map(fileName => {
    const fullPath = path.join(blogsDirectory, fileName);
    const data: BlogPost = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    return data.meta;
  });

  return posts
    .filter(post => !isProduction || !post.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * Returns a single blog post by slug, including the full TipTap content.
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(blogsDirectory, `${slug}.json`);
    const data: BlogPost = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    return data;
  } catch {
    return null;
  }
}

/**
 * Returns all unique categories from published posts.
 */
export async function getCategories(): Promise<string[]> {
  const posts = await getBlogPosts();
  const categories = new Set(posts.map(p => p.category).filter(Boolean));
  return Array.from(categories).sort();
}

/**
 * Returns all unique tags from published posts.
 */
export async function getTags(): Promise<string[]> {
  const posts = await getBlogPosts();
  const tags = new Set(posts.flatMap(p => p.tags));
  return Array.from(tags).sort();
}
