const fs = require('fs');
const path = require('path');

fs.readdir(path.resolve(__dirname, 'styles'), {withFileTypes:true}, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
        let {name} = file;
        let ext = path.extname(name);
        if (ext === '.css') {
            fs.readFile(path.resolve(__dirname, 'styles', name), 'utf-8', (err, data) => {
                if (err) throw err;
                fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), data, err => {
                    if (err) throw err;
                })
            })
        }
    })
})