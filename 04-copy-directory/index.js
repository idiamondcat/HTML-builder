const fs = require('fs');
const path = require('path');

async function copyDir () {
    fs.rmdir(path.resolve(__dirname, 'files-copy'), { recursive: true, force: true }, err => {
        if (err) throw err;
    })
     fs.mkdir(path.resolve(__dirname, 'files-copy'), { recursive: true }, err => {
        if (err) throw err;
    })
     fs.readdir(path.resolve(__dirname, 'files'), {withFileTypes:true}, (err, files) => {
        if (err) throw err;
        files.forEach(file => {
            if (file.isDirectory()) {
                // fs.mkdir(path.resolve(__dirname, 'files-copy', file), { recursive: true }, err => {
                //     if (err) throw err;
                //     if (file.length !== 0) {}
                // })
            } else {
                fs.copyFile(path.resolve(__dirname, 'files', file), path.resolve(__dirname, 'files-copy', file), err => {
                    if (err) throw err;
                })
            }
        })
    })
}
copyDir();