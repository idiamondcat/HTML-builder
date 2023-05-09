const fsP = require('fs/promises');
const fs = require('fs');
const path = require('path');

const makeDir = async (path) => {
    const createDir = await fsP.mkdir(path, { recursive: true });
    return createDir;
}
const copyFiles = async function() {
    const allFiles = await fsP.readdir(path.join(__dirname, 'files'));
    allFiles.forEach(file => {
            fsP.copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', file));
    })
}
const copyDir = function() {
    makeDir(path.resolve(__dirname, 'files-copy'));
    copyFiles();
}
const clearFolder = function() {
    fs.access(path.resolve(__dirname, 'files-copy'), err => {
        if (err) {
            copyDir();
        } else {
            fs.rm(path.resolve(__dirname, 'files-copy'), { recursive: true, force: true }, err => {
                if (err) throw err;
                copyDir();
            })
        }
    })
}
clearFolder();
