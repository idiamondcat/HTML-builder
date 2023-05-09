const fs = require('fs');
const fsP = require('fs/promises');
const path = require('path');

fsP.readFile(path.join(__dirname, 'template.html'))
.then(data => htmlfile = data.toString())
.then(() => fsP.readdir(path.join(__dirname, 'components')))
.then((files) => {
    files.forEach(file => {
        const a = `{{${path.basename(path.join(__dirname, 'components', file), path.extname(file))}}}`;
        fs.readFile(path.join(__dirname, 'components', file), (err, data) => {
            if (err) throw err;
            console.log(htmlfile.split(a));
        })
    })
});