const dirListReducer = require('./dir-list-reducer');
const fs = require('fs');
const path = require('path');

module.exports = dir => {
  const dirList = fs.readdirSync(dir);

  const setsOfStats = dirList.map(each =>
    fs.statSync(path.join(process.cwd(), dir, each)),
  );

  return dirList.reduce(dirListReducer(dir, setsOfStats), {
    directories: [],
    files: [],
  });
};
