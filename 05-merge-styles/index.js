const { stdin, stdout } = process;
const fs = require('fs');
const path = require('path');

const stylesFolderPath = './styles';
const distFolderPath = './project-dist';
const outputFile = 'bundle.css';

function compileStyles() {
  const stylesPath = path.join(distFolderPath, outputFile);

  // Read the contents of the styles folder
  fs.readdir(stylesFolderPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error('Error reading styles folder:', err);
      return;
    }

    // Filter out non-CSS files
    const cssFiles = files.filter(
      (file) => file.isFile() && path.extname(file.name) === '.css',
    );

    // Concatenate the contents of CSS files
    let cssContent = '';
    cssFiles.forEach((file) => {
      const filePath = path.join(stylesFolderPath, file.name);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      cssContent += fileContent;
    });

    // Write the compiled styles to bundle.css
    fs.writeFile(stylesPath, cssContent, (err) => {
      if (err) {
        stdout.write('Error writing bundle.css file:', err);
        return;
      }
      stdout.write('bundle.css file successfully compiled!');
    });
  });
}

compileStyles();
