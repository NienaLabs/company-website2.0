const fs = require('fs');

// 1. Fix queryIndex.md
let md = fs.readFileSync('queryIndex.md', 'utf8');

// Fix link to part 1
md = md.replace(/\[Part 1\]\(invertedIndex\.md\)/g, '[Part 1](/blog/building-a-search-engine-from-scratch)');

// Remove em-dashes (replacing with regular dash for readability)
md = md.replace(/—/g, '-');

// Fix mermaid syntax for flowchart 0 (and others)
md = md.replace(/--\s*"([^"]+)"\s*-->/g, '-->|$1|');

fs.writeFileSync('queryIndex.md', md);

// 2. Fix md_to_tiptap.js metadata em-dashes
let script1 = fs.readFileSync('md_to_tiptap.js', 'utf8');
script1 = script1.replace(/—/g, '-');
fs.writeFileSync('md_to_tiptap.js', script1);

console.log('Fixes applied successfully!');
