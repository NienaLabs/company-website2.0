import { getBlogPostBySlug } from '@/lib/blog';
import { PostEditor } from '../../components/PostEditor';
import { notFound } from 'next/navigation';

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <PostEditor 
      initialMeta={post.meta} 
      initialContent={post.content} 
      isNew={false} 
    />
  );
}
