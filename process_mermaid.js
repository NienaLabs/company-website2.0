const fs = require('fs');

const jsonPath = 'content/blogs/building-a-search-engine-from-scratch-part-2.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let mermaidIndex = 0;

function processNode(node) {
  // 1. Fix "Step X" headings
  if (node.type === 'heading' && node.content && node.content.length > 0) {
    if (node.content[0].type === 'text') {
      const txt = node.content[0].text;
      // "Step 1  Splitting" -> "Step 1: Splitting"
      if (/Step\s+\d+\s+/.test(txt) && !txt.includes(':')) {
        node.content[0].text = txt.replace(/(Step\s+\d+)\s+/, '$1: ');
      } 
      // "Steps 26, for every document" -> "Steps 2-6: for every document"
      else if (/Steps\s+\d+\d+/.test(txt)) {
        node.content[0].text = txt.replace(/(Steps\s+\d+)(\d+)\s*,?\s*/, '$1-$2: ');
      }
    }
  }

  // 2. Extract mermaid code blocks
  if (node.type === 'codeBlock' && node.attrs && node.attrs.language === 'mermaid') {
    if (node.content && node.content.length > 0) {
      const mermaidCode = node.content[0].text;
      
      const payload = {
        code: mermaidCode,
        mermaid: {
          theme: 'dark' // The blog has data-theme="dark"
        }
      };
      
      const b64 = Buffer.from(JSON.stringify(payload)).toString('base64');
      const imageUrl = `https://mermaid.ink/svg/${b64}`;
      
      console.log(`Replacing flowchart ${mermaidIndex} with image URL: ${imageUrl.substring(0, 50)}...`);
      
      // Mutate node to an image node
      node.type = 'image';
      node.attrs = {
        src: imageUrl,
        alt: `Flowchart ${mermaidIndex}`,
        title: null
      };
      delete node.content; // remove the text content
      
      mermaidIndex++;
    }
  }

  // Recursive walk
  if (node.content) {
    node.content.forEach(processNode);
  }
}

// Start walk
data.content.content.forEach(processNode);

// Save back
fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
console.log('Done!');
