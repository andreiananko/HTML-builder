const { stdout } = process;
const fs = require('fs');
const path = require('path');

const distFolderPath = './project-dist';
const templateFilePath = './template.html';
const componentsFolderPath = './components';
const stylesFolderPath = './styles';
const assetsFolderPath = './assets';

function replaceTemplateTags(template, componentFiles) {
  let result = template;
  componentFiles.forEach((file) => {
    const componentName = path.parse(file).name;
    const regex = new RegExp(`{{${componentName}}}`, 'g');
    const componentContent = fs.readFileSync(
      path.join(componentsFolderPath, file),
      'utf8',
    );
    result = result.replace(regex, componentContent);
  });
  return result;
}

function compileStyles() {
  const stylesPath = path.join(distFolderPath, 'style.css');
  const styleFiles = fs
    .readdirSync(stylesFolderPath)
    .filter((file) => path.extname(file) === '.css');

  let cssContent = '';
  styleFiles.forEach((file) => {
    const filePath = path.join(stylesFolderPath, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    cssContent += fileContent;
  });

  fs.writeFileSync(stylesPath, cssContent, 'utf8');
}

function copyAssets() {
  const assetsDistPath = path.join(distFolderPath, 'assets');
  if (!fs.existsSync(assetsDistPath)) {
    fs.mkdirSync(assetsDistPath);
  }

  const files = fs.readdirSync(assetsFolderPath);
  files.forEach((file) => {
    const filePath = path.join(assetsFolderPath, file);
    const targetPath = path.join(assetsDistPath, file);
    fs.copyFileSync(filePath, targetPath);
  });
}

function buildPage() {
  if (!fs.existsSync(distFolderPath)) {
    fs.mkdirSync(distFolderPath);
  }

  const template = fs.readFileSync(templateFilePath, 'utf8');
  const componentFiles = fs
    .readdirSync(componentsFolderPath)
    .filter((file) => path.extname(file) === '.html');

  const indexHTML = replaceTemplateTags(template, componentFiles);
  const indexPath = path.join(distFolderPath, 'index.html');
  fs.writeFileSync(indexPath, indexHTML, 'utf8');

  compileStyles();
  copyAssets();

  stdout.write('Page build completed!');
}

buildPage();
