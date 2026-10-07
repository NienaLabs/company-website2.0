import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { calculateReadingTime } from '@/lib/blog';
import { revalidatePath } from 'next/cache';
import imagekit from '@/lib/imagekit';

const blogsDirectory = path.join(process.cwd(), 'content', 'blogs');

// Helper to extract all image and file URLs from a TipTap JSON content tree
function extractAssetUrls(content: any): string[] {
  const urls: string[] = [];
  
  // Extract image sources
  if (content?.type === 'image' && content.attrs?.src) {
    urls.push(content.attrs.src);
  }
  
  // Extract file link URLs
  if (content?.marks && Array.isArray(content.marks)) {
    for (const mark of content.marks) {
      if (mark.type === 'link' && mark.attrs?.href) {
        urls.push(mark.attrs.href);
      }
    }
  }

  if (content?.content && Array.isArray(content.content)) {
    for (const node of content.content) {
      urls.push(...extractAssetUrls(node));
    }
  }
  return urls;
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { meta, content } = await req.json();

    if (!meta || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const filePath = path.join(blogsDirectory, `${slug}.json`);

    try {
      await fs.access(filePath);
    } catch {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

      // Sync ImageKit: Find orphaned assets and delete them
    try {
      const usedUrls = new Set<string>(extractAssetUrls(content));
      if (meta.coverImage) {
        usedUrls.add(meta.coverImage);
      }

      // Extract just the filenames from the used URLs to avoid domain/protocol mismatches
      const usedFileNames = new Set(
        Array.from(usedUrls).map(url => {
          try {
            return new URL(url).pathname.split('/').pop();
          } catch {
            return url.split('/').pop();
          }
        })
      );

      // List all files in this post's folder
      const files = await imagekit.listFiles({ path: `/blog/${slug}/` });
      
      for (const file of files) {
        if (!usedFileNames.has(file.name)) {
          console.log(`Deleting unused image from ImageKit: ${file.name}`);
          await imagekit.deleteFile(file.fileId);
        }
      }
    } catch (ikError) {
      console.error('ImageKit sync failed during PUT:', ikError);
      // We don't fail the post update if ImageKit cleanup fails
    }

    const readingTime = calculateReadingTime(content);

    const postData = {
      meta: {
        ...meta,
        slug,
        readingTime,
        updatedAt: new Date().toISOString().split('T')[0],
      },
      content,
    };

    await fs.writeFile(filePath, JSON.stringify(postData, null, 2), 'utf8');

    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);
    revalidatePath('/sitemap.xml');

    return NextResponse.json({ success: true, slug });
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const filePath = path.join(blogsDirectory, `${slug}.json`);

    try {
      await fs.access(filePath);
    } catch {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    await fs.unlink(filePath);

    // Also delete all images in ImageKit for this post
    try {
      await imagekit.deleteFolder(`/blog/${slug}/`);
      console.log(`Deleted ImageKit folder for post: ${slug}`);
    } catch (ikError) {
      console.error(`Failed to delete ImageKit folder for ${slug}:`, ikError);
    }

    revalidatePath('/blog');
    revalidatePath('/sitemap.xml');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
