const fs = require('fs').promises;
const path = require('path');

const buildPage = async () => {
  try {
    // Step 1: Create project-dist folder
    const distFolderPath = '06-build-page/project-dist';
    await fs.mkdir(distFolderPath, { recursive: true });

    // Step 2: Read and save the template file
    const templateFilePath = '06-build-page/template.html';
    const templateContent = await fs.readFile(templateFilePath, 'utf8');

    // Step 3: Find all tag names in the template file
    const tagRegex = /{{\s*([^}\s]+)\s*}}/g;
    const tagMatches = [...templateContent.matchAll(tagRegex)];

    // Step 4: Replace template tags with content of component files
    let modifiedTemplateContent = templateContent;
    for (const [, tagName] of tagMatches) {
      const componentFilePath = path.join('06-build-page/components', `${tagName}.html`);
      const componentContent = await fs.readFile(componentFilePath, 'utf8');
      modifiedTemplateContent = modifiedTemplateContent.replace(
        `{{${tagName}}}`,
        componentContent
      );
    }

    // Step 5: Write the modified template to index.html
    const indexPath = path.join(distFolderPath, 'index.html');
    await fs.writeFile(indexPath, modifiedTemplateContent);

    // Step 6: Compile styles into style.css
    const stylesFolderPath = '06-build-page/styles';
    const stylesPath = path.join(distFolderPath, 'style.css');
    const stylesFiles = await fs.readdir(stylesFolderPath, { withFileTypes: true });
    let cssContent = '';
    
    for (const file of stylesFiles) {
      if (file.isFile() && path.extname(file.name) === '.css') {
        const filePath = path.join(stylesFolderPath, file.name);
        const fileContent = await fs.readFile(filePath, 'utf8');
        cssContent += fileContent;
      }
    }

    await fs.writeFile(stylesPath, cssContent);

    // Step 7: Copy assets folder into project-dist
    const sourceAssetsPath = '06-build-page/assets';
    const destinationAssetsPath = path.join(distFolderPath, 'assets');
    await copyDir(sourceAssetsPath, destinationAssetsPath);

    console.log('Build successful! Check the project-dist folder.');
  } catch (error) {
    console.error('Error building page:', error);
  }
};

// Helper function to copy a directory
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

// Execute the buildPage function
buildPage();
