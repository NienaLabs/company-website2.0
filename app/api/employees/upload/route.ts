import { NextRequest, NextResponse } from 'next/server';
import imagekit from '@/lib/imagekit';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const slug = formData.get('slug') as string | null;

    if (!file || !slug) {
      return NextResponse.json(
        { 
          error: 'File and slug are required',
          debug: { hasFile: !!file, hasSlug: !!slug, slugValue: slug }
        },
        { status: 400 }
      );
    }

    // Validate file type - allowing images, videos, pdfs, zips, docs
    const allowedPrefixes = ['image/', 'video/', 'audio/', 'application/'];
    const isAllowed = allowedPrefixes.some(prefix => file.type.startsWith(prefix));
    
    if (!file.type || !isAllowed) {
      return NextResponse.json(
        { error: `Invalid file type: "${file.type}". Unsupported file format.` },
        { status: 400 }
      );
    }

    // Validate size (< 20MB for general files)
    if (file.size > 20 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 20MB.' },
        { status: 400 }
      );
    }

    // Convert File to Buffer for ImageKit upload
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Generate a safe filename
    const originalName = file.name;
    const extension = originalName.substring(originalName.lastIndexOf('.'));
    const baseName = originalName.substring(0, originalName.lastIndexOf('.'));
    const safeBaseName = baseName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const fileName = `${Date.now()}-${safeBaseName}${extension}`;

    // Upload to ImageKit
    const uploadResponse = await imagekit.upload({
      file: buffer,
      fileName,
      folder: `/blog/${slug}/`,
      useUniqueFileName: false, // We're already making it unique with Date.now()
    });

    return NextResponse.json({
      success: true,
      url: uploadResponse.url,
      fileId: uploadResponse.fileId,
    });
  } catch (error) {
    console.error('Image upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}
