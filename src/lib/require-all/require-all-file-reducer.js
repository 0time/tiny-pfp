const convertToCamelCase = require('../string/convert-to-camel-case');
const path = require('path');
const set = require('../set');

module.exports = dir => (acc, file) =>
  console.error(6, dir, file) ||
  set(acc, convertToCamelCase(file), require(path.resolve(dir, file)));
