const fs = require('fs');
const fsP = require('fs/promises');
const path = require('path');

const createPage = async function() {
  try {
    await fsP.access(path.join(__dirname, 'project-dist'));
    await fsP.rm(path.join(__dirname, 'project-dist'), { recursive: true });
  } catch(error) {
    console.log(error.message);
  }
  try {
    await fsP.mkdir(path.join(__dirname, 'project-dist'));
    let htmlfile = await fsP.readFile(path.join(__dirname, 'template.html'), 'utf-8');
    const reg = /{{(.*?)}}/g;
    const files = Array.from(htmlfile.matchAll(reg), match => match[1]);
    files.forEach(elem => {
      const component = fsP.readFile(path.join(__dirname, 'components', `${elem}`), 'utf-8');
      htmlfile = htmlfile.replace(`{{${elem}}}`, component);
    });
    await fsP.writeFile(path.join(__dirname, 'project-dist', 'index.html'), htmlfile);
    await mergeStyles();
    await copyFiles(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist', 'assets'));
  } catch(error) {
    console.log(error.message);
  }
};
createPage();

const mergeStyles = async function() {
  const allFiles = await fsP.readdir(path.resolve(__dirname, 'styles'));
  allFiles.forEach(file => {
    try {
      fs.stat(path.resolve(__dirname, 'styles', file), (err, stats) => {
        if (stats.isFile() && path.extname(file) === '.css') {
          fs.createReadStream(path.resolve(__dirname, 'styles', file), 'utf-8');
          fs.readFile(path.resolve(__dirname, 'styles', file), 'utf-8', (err, data) => {
            if (err) throw err;
            fs.appendFile(path.join(__dirname, 'project-dist', 'style.css'), data, err => {
              if (err) throw err;
            });
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  });
};
const copyFiles = async function(mainPath, newPath) {
  await fsP.mkdir(newPath, { recursive: true });
  const allFiles = await fsP.readdir(mainPath);
  for (const file of allFiles) {
    const filePath = path.join(mainPath, file);
    const fileNewPath = path.join(newPath, file);
    const fileStat = await fsP.stat(filePath);
    if (fileStat.isDirectory()) {
      await copyFiles(filePath, fileNewPath);
    } else {
      await fsP.copyFile(filePath, fileNewPath);
    }
  }
};