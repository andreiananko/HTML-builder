const { stdin, stdout } = process;
const fs = require('fs');
const path = require('path');

const folderPath = './secret_folder';

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Error reading folder:', err);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    const fileType = path.extname(filePath).toLowerCase();

    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.error('Error getting file stats:', err);
        return;
      }

      stdout.write(file + '- ' + fileType + '-' + stats.size + ' bytes' + '\n');
    });
  });
});
