/**
 * Shared TipTap extension configuration.
 *
 * Used by both:
 * - The admin PostEditor (client-side editing)
 * - The blog-renderer (server-side generateHTML)
 *
 * Keeping them in sync ensures the rendered HTML matches what the editor produces.
 */

import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import Link from '@tiptap/extension-link';

// Note: CodeBlockLowlight is excluded from shared extensions because
// it requires different setup on client (interactive) vs server (static HTML).
// The StarterKit codeBlock is used instead for basic code block support.

export function getSharedExtensions() {
  return [
    StarterKit.configure({
      heading: {
        levels: [2, 3],
      },
    }),
    Image.configure({
      HTMLAttributes: {
        loading: 'lazy',
      },
    }),
    Table.configure({
      resizable: false,
    }),
    TableRow,
    TableCell,
    TableHeader,
    Link.configure({
      openOnClick: false,
      HTMLAttributes: {
        rel: 'noopener noreferrer',
        target: '_blank',
      },
    }),
  ];
}
