const fs = require('fs');
const path = require('path');

const md = fs.readFileSync('queryIndex.md', 'utf8');

function parseInline(text) {
  const nodes = [];
  // regex for matching inline elements
  // This is a simplified regex, real markdown parsing is complex
  const regex = /(\*\*.*?\*\*|\*.*?\*|`.*?`|\[.*?\]\(.*?\))/g;
  
  let lastIndex = 0;
  let match;
  
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push({ type: 'text', text: text.substring(lastIndex, match.index) });
    }
    
    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      nodes.push({ type: 'text', marks: [{ type: 'bold' }], text: token.slice(2, -2) });
    } else if (token.startsWith('*') && token.endsWith('*')) {
      nodes.push({ type: 'text', marks: [{ type: 'italic' }], text: token.slice(1, -1) });
    } else if (token.startsWith('`') && token.endsWith('`')) {
      nodes.push({ type: 'text', marks: [{ type: 'code' }], text: token.slice(1, -1) });
    } else if (token.startsWith('[')) {
      const linkMatch = token.match(/\[(.*?)\]\((.*?)\)/);
      if (linkMatch) {
        nodes.push({
          type: 'text',
          marks: [{ type: 'link', attrs: { href: linkMatch[2] } }],
          text: linkMatch[1]
        });
      }
    }
    lastIndex = regex.lastIndex;
  }
  
  if (lastIndex < text.length && text.substring(lastIndex).length > 0) {
    nodes.push({ type: 'text', text: text.substring(lastIndex) });
  }
  
  // Filter out any nodes that might have empty text
  const validNodes = nodes.filter(n => n.text && n.text.length > 0);
  
  return validNodes.length > 0 ? validNodes : [];
}

function parseMarkdown(md) {
  const lines = md.split('\n');
  const blocks = [];
  
  let i = 0;
  while (i < lines.length) {
    let line = lines[i];
    
    // Skip empty lines
    if (line.trim() === '') {
      i++;
      continue;
    }
    
    // Headings
    const headingMatch = line.match(/^(#{1,6})\s+(.*)/);
    if (headingMatch) {
      blocks.push({
        type: 'heading',
        attrs: { level: headingMatch[1].length },
        content: parseInline(headingMatch[2])
      });
      i++;
      continue;
    }
    
    // Blockquote
    if (line.startsWith('> ')) {
      let bqLines = [];
      while (i < lines.length && lines[i].startsWith('>')) {
        bqLines.push(lines[i].replace(/^>\s*/, ''));
        i++;
      }
      blocks.push({
        type: 'blockquote',
        content: [
          {
            type: 'paragraph',
            content: parseInline(bqLines.join(' '))
          }
        ]
      });
      continue;
    }
    
    // Unordered List
    if (line.match(/^[-*]\s+/)) {
      let listItems = [];
      while (i < lines.length && lines[i].match(/^[-*]\s+/)) {
        listItems.push({
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: parseInline(lines[i].replace(/^[-*]\s+/, ''))
            }
          ]
        });
        i++;
      }
      blocks.push({
        type: 'bulletList',
        content: listItems
      });
      continue;
    }
    
    // Ordered List
    if (line.match(/^\d+\.\s+/)) {
      let listItems = [];
      while (i < lines.length && lines[i].match(/^\d+\.\s+/)) {
        listItems.push({
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: parseInline(lines[i].replace(/^\d+\.\s+/, ''))
            }
          ]
        });
        i++;
      }
      blocks.push({
        type: 'orderedList',
        content: listItems
      });
      continue;
    }
    
    // Code block
    if (line.startsWith('```')) {
      const language = line.slice(3).trim();
      i++;
      let codeLines = [];
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      blocks.push({
        type: 'codeBlock',
        attrs: { language: language || 'plaintext' },
        content: [{ type: 'text', text: codeLines.join('\n') }]
      });
      continue;
    }
    
    // Tables
    if (line.includes('|') && i + 1 < lines.length && lines[i+1].includes('|-')) {
      const headerLine = line;
      i += 2; // skip header and separator
      
      const headers = headerLine.split('|').slice(1, -1).map(s => s.trim());
      
      const tableRows = [];
      // Header row
      tableRows.push({
        type: 'tableRow',
        content: headers.map(h => ({
          type: 'tableHeader',
          content: [{ type: 'paragraph', content: parseInline(h) }]
        }))
      });
      
      // Body rows
      while (i < lines.length && lines[i].includes('|')) {
        const rowData = lines[i].split('|').slice(1, -1).map(s => s.trim());
        tableRows.push({
          type: 'tableRow',
          content: rowData.map(d => ({
            type: 'tableCell',
            content: [{ type: 'paragraph', content: parseInline(d) }]
          }))
        });
        i++;
      }
      
      blocks.push({
        type: 'table',
        content: tableRows
      });
      continue;
    }

    // Horizontal rule
    if (line.match(/^---$/)) {
      blocks.push({ type: 'horizontalRule' });
      i++;
      continue;
    }
    
    // Paragraph (default)
    let pLines = [];
    while (i < lines.length && lines[i].trim() !== '' && !lines[i].startsWith('#') && !lines[i].startsWith('>') && !lines[i].match(/^[-*]\s+/) && !lines[i].match(/^\d+\.\s+/) && !lines[i].startsWith('```') && !lines[i].includes('|') && !lines[i].match(/^---$/)) {
      pLines.push(lines[i]);
      i++;
    }
    
    if (pLines.length === 0) {
      // Fallback: just consume the line as a paragraph if it didn't match anything
      pLines.push(lines[i]);
      i++;
    }

    const parsedContent = parseInline(pLines.join(' '));
    if (parsedContent.length > 0) {
      blocks.push({
        type: 'paragraph',
        content: parsedContent
      });
    }
  }
  
  return blocks;
}

const content = parseMarkdown(md);

const blogJson = {
  meta: {
    title: "Building a Search Engine From Scratch - Part 2: Querying the Inverted Index",
    slug: "building-a-search-engine-from-scratch-part-2",
    excerpt: "An index is a promise: 'I already know where every word lives.' A query engine is how you collect on that promise without wasting a single millisecond.",
    author: "Williams Adusei",
    category: "Engineering",
    tags: ["Search Engine", "Engineering", "Algorithms", "Backend"],
    coverImage: "/images/blogs/search_engine_part2_cover.jpg",
    draft: false,
    featured: true,
    authorRole: "Software and AI engineer",
    date: new Date().toISOString().split('T')[0],
    readingTime: 35,
    authorProfile: "https://linkedin.com/in/williams-adusei-a1053a366"
  },
  content: {
    type: "doc",
    content: content
  }
};

fs.writeFileSync(path.join(__dirname, 'content/blogs/building-a-search-engine-from-scratch-part-2.json'), JSON.stringify(blogJson, null, 2));
console.log('Successfully generated blog JSON.');
