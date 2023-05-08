const fs = require('fs');
const path = require('path');
const readline = require('readline');
const {stdin: input, stdout: output} = require('process');
const rl = readline.createInterface({input, output});

const writeData = async (path) => {
    console.log('Hello, type something...\n');
    rl.on('line', (input) => {
        if (input === 'exit') {
            input = '';
            console.log('Goodbye');
            rl.close();
        }
        fs.appendFile(path, input + '\n', (err) => {
            if (err) throw err;
        })
    })
    rl.on('SIGINT', () => {
        console.log('Goodbye');
        rl.close();
    })
};
writeData(path.join(__dirname, 'text.txt'));

