import { redirect } from 'next/navigation';

export default function AdminIndexPage() {
  // Redirect /admin to /admin/posts
  redirect('/admin/posts');
}
