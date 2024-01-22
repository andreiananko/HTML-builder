const fs = require('fs');
const path = require('path');

const sourceFolder = './files';
const destinationFolder = './files-copy';

function copyDir(source, destination) {
  fs.readdir(source, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination);
    }

    files.forEach((file) => {
      const sourcePath = path.join(source, file.name);
      const destinationPath = path.join(destination, file.name);

      if (file.isDirectory()) {
        copyDir(sourcePath, destinationPath);
      } else {
        fs.copyFileSync(sourcePath, destinationPath);
      }
    });
  });
}

copyDir(sourceFolder, destinationFolder);
