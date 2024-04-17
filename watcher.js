// watcher.js
const { divless } = require('./divless.js'); // Import your library
const chokidar = require('chokidar');
const path = require('path');
const fs = require('fs');

console.log(divless)

const folderToWatch = path.join(process.cwd(), '.divless'); // Path to the folder you want to watch

// Initialize watcher
const watcher = chokidar.watch(folderToWatch, {
  ignored: /(^|[\/\\])\.(?!divless($|[\/\\]))/, // Ignore dotfiles except .divless
  persistent: true,
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