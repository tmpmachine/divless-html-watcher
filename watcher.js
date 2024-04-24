const { divless } = require('./divless.js');
const chokidar = require('chokidar');
const path = require('path');
const fs = require('fs');


// Initialize watcher
const watcher = chokidar.watch('**/.divless/**/*', {
  ignored: /(^|[\/\\])\.(?!divless($|[\/\\]))/, // Ignore dotfiles except .divless
  depth: 99, // limits how many levels of subdirectories will be traversed.
  cwd: process.cwd(), // Set the current working directory for the watcher
});

// Add event listeners
watcher
  .on('change', filePath => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading file ${filePath}: ${err}`);
        return;
      }
      const fileName = path.basename(filePath);
      const parentDir = path.dirname(filePath);
      const newFilePath = path.join(parentDir, '..', fileName);
      
      fs.writeFile(newFilePath, divless.replace(data), 'utf8', err => {
        if (err) {
          console.error(`Error creating file ${newFilePath}: ${err}`);
          return;
        }
        
        console.log(`New file created at ${newFilePath}`);
      });
    });
  })

console.log(`Watching ${folderToWatch} for changes...`);