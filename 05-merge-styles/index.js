const fs = require('fs');
const fsP = require('fs/promises');
const path = require('path');

const writableStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));
const mergeStyles = async function() {
    const allFiles = await fsP.readdir(path.resolve(__dirname, 'styles'));
    allFiles.forEach(file => {
        try {
            fs.stat(path.resolve(__dirname, 'styles', file), (err, stats) => {
                if (stats.isFile() && path.extname(file) === '.css') {
                    fs.createReadStream(path.resolve(__dirname, 'styles', file), 'utf-8');
                    fs.readFile(path.resolve(__dirname, 'styles', file), 'utf-8', (err, data) => {
                        if (err) throw err;
                        fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), data, err => {
                            if (err) throw err;
                        })
                    })
                }
            })
        } catch (err) {
            console.log(err);
        }
    })
}
mergeStyles();
