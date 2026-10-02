import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { generateSlug, calculateReadingTime } from '@/lib/blog';
import { revalidatePath } from 'next/cache';

const blogsDirectory = path.join(process.cwd(), 'content', 'blogs');

// Ensure the directory exists
async function ensureDirectory() {
  try {
    await fs.access(blogsDirectory);
  } catch {
    await fs.mkdir(blogsDirectory, { recursive: true });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { meta, content } = await req.json();

    if (!meta || !meta.title || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const slug = meta.slug || generateSlug(meta.title);
    const readingTime = calculateReadingTime(content);

    const postData = {
      meta: {
        ...meta,
        slug,
        readingTime,
        date: meta.date || new Date().toISOString().split('T')[0],
      },
      content,
    };

    await ensureDirectory();
    const filePath = path.join(blogsDirectory, `${slug}.json`);

    // Check if it already exists to prevent overwriting without PUT
    try {
      await fs.access(filePath);
      return NextResponse.json({ error: 'Post with this slug already exists' }, { status: 409 });
    } catch {
      // Doesn't exist, we can proceed
    }

    await fs.writeFile(filePath, JSON.stringify(postData, null, 2), 'utf8');

    // Trigger static revalidation
    revalidatePath('/blog');
    revalidatePath('/sitemap.xml');

    return NextResponse.json({ success: true, slug });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
