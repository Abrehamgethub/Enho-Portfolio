const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? 
      walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('./app', function(filePath) {
  if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace typing
    let updated = content.replace(/{ params }: { params: { id: string } }/g, '{ params }: { params: Promise<{ id: string }> }');
    
    // In any file where we updated the typing, we must await params.id
    if (updated !== content) {
      // Find `params.id` and replace with `(await params).id`
      // For Next 15, we can just await the whole params object at the top of the function
      // but modifying `params.id` inline is easier.
      updated = updated.replace(/params\.id/g, '(await params).id');
      
      fs.writeFileSync(filePath, updated);
      console.log('Fixed', filePath);
    }
  }
});
