const fs = require('fs');
const path = require('path');

const sectionsDir = path.join(__dirname, 'components', 'sections');

fs.readdirSync(sectionsDir).forEach(file => {
  if (file.endsWith('.tsx')) {
    const filePath = path.join(sectionsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace id="xyz" inside section tags. We'll simply replace <section id="..." with <section
    content = content.replace(/<section\s+id="[^"]*"\s+/g, '<section ');
    
    fs.writeFileSync(filePath, content);
  }
});
console.log("Done removing section IDs");
