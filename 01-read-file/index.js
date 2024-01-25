const { stdout, exit } = process;
const fs = require('fs');

const filePath = '01-read-file/text.txt';
const readStream = fs.createReadStream(filePath, 'utf8');

readStream.on('error', (error) => {
  console.error(error);
  process.exit(1);
});

readStream.on('data', (data) => {
  stdout.write(data + '\n');
});

readStream.on('end', () => {
  process.exit();
});
