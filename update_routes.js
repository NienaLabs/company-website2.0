const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace '/admin' followed by any boundary or quote
  let newContent = content.replace(/\/admin(?=\/|'|"|`| |\?|\#|$)/g, '/employees');
  
  // Replace 'api/admin' just in case the above missed it or it doesn't have a leading slash
  newContent = newContent.replace(/api\/admin(?=\/|'|"|`| |\?|\#|$)/g, 'api/employees');
  
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

const filesToUpdate = [
  'proxy.ts',
  'lib/imagekit.ts',
  'app/components/Navbar.tsx',
  'app/components/FloatingWidget.tsx'
];

filesToUpdate.forEach(replaceInFile);

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      replaceInFile(fullPath);
    }
  }
}

walk('app/employees');
walk('app/api/employees');
