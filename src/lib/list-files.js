// TODO: Migrate me to an ultra-light library
const fs = require('fs');
const mapValues = require('./map-values');
const path = require('path');
const promisifyCreator = require('./promisify-creator');

const dirListReducer = (dir, setsOfStats) => (
  { directories, files },
  each,
  index,
) => ({
  files: setsOfStats[index].isFile() ? files.concat([`${dir}/${each}`]) : files,
  directories: setsOfStats[index].isDirectory()
    ? directories.concat([`${dir}/${each}`])
    : directories,
});

const reduceToTypes = (promLib, fsp, dir) =>
  fsp.readdir(dir).then(dirList =>
    promLib
      .all(dirList.map(each => fsp.stat(path.join(process.cwd(), dir, each))))
      .then(setsOfStats =>
        dirList.reduce(dirListReducer(dir, setsOfStats), {
          directories: [],
          files: [],
        }),
      ),
  );

const listFiles = function(appContext) {
  return async dir => {
    const promisify = promisifyCreator(appContext);

    const fsp = mapValues(fs, promisify);

    const types = { directories: [dir], files: [] };

    while (types.directories.length > 0) {
      const newTypes = await reduceToTypes(
        appContext.Promise,
        fsp,
        types.directories.pop(),
      );

      types.directories = types.directories.concat(newTypes.directories);
      types.files = types.files.concat(newTypes.files);
    }

    return types.files;
  };
};

module.exports = listFiles;
module.exports.dirListReducer = dirListReducer;
