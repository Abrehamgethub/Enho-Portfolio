const fs = require('fs');
const path = require('path');

const dir = '/Users/dawitg/Desktop/Enho-Portfolio/components/sections';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Replace literal backslash-n with actual newline
  let newContent = content.replace(/\\n/g, '\n');
  
  // Also clean up any extra backslash-n-backslash-n
  newContent = newContent.replace(/\\n\\n/g, '\n\n');
  
  fs.writeFileSync(filePath, newContent);
  console.log(`Fixed ${file}`);
}
