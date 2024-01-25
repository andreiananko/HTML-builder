const { stdout, exit } = process;

const fs = require('fs');

const dataTextFile = fs.readFile(
  '01-read-file/text.txt',
  'utf8',
  (error, data) => {
    if (error) {
      console.error(error);
      process.exit(1);
    }
    stdout.write(data + '\n');
    process.exit();
  },
);
