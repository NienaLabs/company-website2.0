/**
 * Server-side blog content renderer.
 *
 * Converts TipTap JSON → HTML string using generateHTML(),
 * then post-processes the HTML to inject heading IDs and lazy loading.
 */

import { generateHTML } from '@tiptap/html';
import type { JSONContent } from '@tiptap/core';
import { getSharedExtensions } from './tiptap-extensions';
import katex from 'katex';

/**
 * Renders TipTap JSON content to an HTML string, ready for
 * dangerouslySetInnerHTML in the blog post page.
 */
export function renderBlogContent(content: JSONContent): string {
  const extensions = getSharedExtensions();
  let html = generateHTML(content, extensions);

  // Post-process: inject heading IDs for table of contents anchors
  html = addHeadingIds(html);

  // Post-process: add lazy loading to all images
  html = addLazyLoading(html);

  // Post-process: render LaTeX math equations with KaTeX
  html = addMathRendering(html);

  return html;
}

/**
 * Injects id and class attributes onto h2 and h3 elements
 * so they match the table of contents anchors.
 */
function addHeadingIds(html: string): string {
  return html.replace(
    /<h([23])>([\s\S]*?)<\/h[23]>/g,
    (_match, level: string, innerHtml: string) => {
      // Strip any HTML tags to get the raw text for the ID
      const text = innerHtml.replace(/<[^>]*>/g, '').trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      return `<h${level} id="${id}" class="blog-heading">${innerHtml}</h${level}>`;
    }
  );
}

/**
 * Adds loading="lazy" to all <img> tags that don't already have it.
 */
function addLazyLoading(html: string): string {
  return html.replace(
    /<img(?![^>]*loading=)/g,
    '<img loading="lazy"'
  );
}

function unescapeHtml(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

/**
 * Parses LaTeX display blocks and inline formulas and renders them to HTML via KaTeX.
 */
function addMathRendering(html: string): string {
  // 1. Process display math blocks: <pre><code class="language-math">...</code></pre>
  html = html.replace(
    /<pre><code class="language-math">([\s\S]*?)<\/code><\/pre>/g,
    (_match, latex) => {
      try {
        const cleanLatex = unescapeHtml(latex.trim());
        const rendered = katex.renderToString(cleanLatex, {
          displayMode: true,
          throwOnError: false,
        });
        return `<div class="blog-math-block">${rendered}</div>`;
      } catch {
        return _match;
      }
    }
  );

  // 2. Process standalone display math paragraphs: <p>$$...$$</p>
  html = html.replace(
    /<p>\s*\$\$([\s\S]*?)\$\$\s*<\/p>/g,
    (_match, latex) => {
      try {
        const cleanLatex = unescapeHtml(latex.trim());
        const rendered = katex.renderToString(cleanLatex, {
          displayMode: true,
          throwOnError: false,
        });
        return `<div class="blog-math-block">${rendered}</div>`;
      } catch {
        return _match;
      }
    }
  );

  // 3. Process inline math: $...$
  html = html.replace(
    /(?<![\\$])\$([^\$\n\r<>&]+?)\$(?!\$)/g,
    (_match, latex) => {
      try {
        const cleanLatex = unescapeHtml(latex.trim());
        const rendered = katex.renderToString(cleanLatex, {
          displayMode: false,
          throwOnError: false,
        });
        return `<span class="blog-math-inline">${rendered}</span>`;
      } catch {
        return _match;
      }
    }
  );

  return html;
}

