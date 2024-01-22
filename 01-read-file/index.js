const { stdout } = process;

const fs = require('fs');

const dataTextFile = fs.readFile('text.txt', 'utf8', (error, data) => {
  if (error) {
    console.error(error);
    return;
  }
  stdout.write(data);
  process.exit();
});
