const fs = require('fs');
const path = require('path');
const readline = require('readline');
const {stdin: input, stdout: output, exit: exit} = require('process');
const rl = readline.createInterface({input, output});
const writableStream = fs.createWriteStream(path.join(__dirname, 'text.txt'));

const writeData = async (path) => {
    output.write('Hello, type something...\n');
    rl.on('line', (input) => {
        if (input.toLowerCase() === 'exit') {
            input = '';
            output.write('Goodbye');
            rl.close();
            exit();
        }
        writableStream.write(input + '\n', (err) => {
            if (err) throw err;
        })
    })
    rl.on('SIGINT', () => {
        output.write('Goodbye');
        rl.close();
        exit();
    })
};
writeData(path.join(__dirname, 'text.txt'));

