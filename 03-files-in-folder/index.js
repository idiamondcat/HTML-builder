const fs = require('fs');
const fsP = require('fs/promises');
const path = require('path');

const readFiles = async function() {
    await fs.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes:true}, (err, files) => {
    if (err) {
        throw err;
    } else {
        files.forEach(file => {
            if (file.isFile()) {
                let {name} = file;
                let ext = path.extname(name);
                fs.stat(path.join(__dirname, 'secret-folder', name), (err, stats) => {
                    let size = stats.size / 1024;
                    console.log(`${name} -  ${ext} - ${size}kb`);
                });
            }
        })
    }
})
}
readFiles();