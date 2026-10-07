const fs = require('fs');
const path = require('path');
const ImageKit = require('imagekit');

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || '',
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || '',
});

function extractAssetUrls(content) {
  const urls = [];
  if (content?.type === 'image' && content.attrs?.src) {
    urls.push(content.attrs.src);
  }
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

async function test() {
  const slug = 'building-a-search-engine-from-scratch';
  const filePath = path.join(process.cwd(), 'content', 'blogs', `${slug}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  const usedUrls = new Set(extractAssetUrls(data.content));
  if (data.meta.coverImage) {
    usedUrls.add(data.meta.coverImage);
  }
  
  console.log("Used URLs in JSON:", Array.from(usedUrls));
  
  try {
    const files = await imagekit.listFiles({ path: `/blog/${slug}/` });
    console.log("Files in ImageKit:", files.map(f => f.url));
    
    for (const file of files) {
      console.log(`URL: ${file.url} | Matched: ${usedUrls.has(file.url)}`);
    }
  } catch(e) {
    console.error(e);
  }
}
test();
