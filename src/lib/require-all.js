// TODO: Migrate me to an ultra-light library
const camelCase = require('./camel-case');
const listFiles = require('./list-files');
const path = require('path');
const set = require('./set');

const convertToCamelCaseKey = filename =>
  camelCase(filename.replace(/\.js$/, '').replace(/^[./]*/, '')).replace(
    /\//g,
    '.',
  );

module.exports = appContext => dir =>
  listFiles(appContext)(dir)
    .then(files => files.map(file => file.replace(dir, '')))
    .then(files =>
      files.reduce((acc, file) => {
        set(
          acc,
          convertToCamelCaseKey(file),
          require(path.join(process.cwd(), dir, file)),
        );

        return acc;
      }, {}),
    );
