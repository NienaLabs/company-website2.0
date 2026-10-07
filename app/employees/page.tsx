import { redirect } from 'next/navigation';

export default function AdminIndexPage() {
  // Redirect /employees to /employees/posts
  redirect('/employees/posts');
}
