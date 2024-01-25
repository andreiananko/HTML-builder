const fs = require('fs').promises;
const path = require('path');

const sourceFolder = '04-copy-directory/files';
const destinationFolder = '04-copy-directory/files-copy';

async function copyDir(source, destination) {
  try {
    const files = await fs.readdir(source, { withFileTypes: true });

    if (!await fs.access(destination).then(() => true).catch(() => false)) {
      await fs.mkdir(destination);
    }

    for (const file of files) {
      const sourcePath = path.join(source, file.name);
      const destinationPath = path.join(destination, file.name);

      if (file.isDirectory()) {
        await copyDir(sourcePath, destinationPath);
      } else {
        await fs.copyFile(sourcePath, destinationPath);
      }
    }
  } catch (err) {
    console.error('Error copying directory:', err);
  }
}

copyDir(sourceFolder, destinationFolder);
