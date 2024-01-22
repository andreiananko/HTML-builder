const { stdin, stdout } = process;

const fs = require('fs');
stdout.write('Hello friend! Input some text and press enter: ');
const content = stdin.on('data', (data) => {
  const dataStringified = data.toString();
  fs.writeFile('text.txt', dataStringified, (error) => {
    if (error) {
      console.error(error);
      return;
    }
    stdout.write('Your text was saved!');
  });
});
