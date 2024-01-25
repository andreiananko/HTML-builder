const { stdin, stdout, exit } = process;

const fs = require('fs');
const textFilePath = '02-write-file/text.txt';

stdout.write('Hello friend! Input some text and press enter: ');

stdin.on('data', (data) => {
  const userInput = data.toString().trim(); // Trim to remove leading/trailing whitespaces

  if (userInput.toLowerCase() === 'exit') {
    console.log('Your text input was stopped. Have a nice day! :) Goodbye!');
    process.exit();
  }

  fs.appendFile(textFilePath, userInput + '\n', (error) => {
    if (error) {
      console.error(error);
      return;
    }
    stdout.write('Your text was saved! Input more text or type "exit" to end: ');
  });
});

// Handle Ctrl+C (SIGINT) to exit the process
stdin.on('SIGINT', () => {
  console.log('\nInterrupted by user! Your text input was stopped. Have a nice day! :) Goodbye!');
  process.exit();
});
