const { stdin, stdout } = process;
const fs = require('fs');
const path = require('path');

const readFilesInFolder = (folderPath) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error('Error reading folder:', err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(folderPath, file);

      // Check if it's a directory
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error('Error getting file stats:', err);
          return;
        }

        if (stats.isDirectory()) {
          // Recursively read files in the subfolder
          readFilesInFolder(filePath);
        } else {
          // Process the file
          const fileType = path.extname(filePath).toLowerCase();
          const fileSize = stats.size;

          // Print or use the gathered information
          console.log( file, fileType, fileSize + ' bytes' );
        }
      });
    });
  });
};

const folderPath = '03-files-in-folder/secret-folder';
readFilesInFolder(folderPath);
