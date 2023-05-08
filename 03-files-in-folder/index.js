const fs = require('fs');
const path = require('path');

const readFiles = function() {
    fs.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes:true}, (err, files) => {
    if (err) {
        throw err;
    } else {
        files.forEach(file => {
            if (file.isFile()) {
                let {name} = file;
                let ext = path.extname(name);
                let size = fs.statSync(path.join(__dirname, 'secret-folder', name)).size / 1024;
                console.log(name + ' - ' + ext+ ' - ' + size + 'kb');
            }
        })
    }
})
}
readFiles();