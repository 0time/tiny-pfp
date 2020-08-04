const convertToCamelCase = require('../string/convert-to-camel-case');
const path = require('path');
const set = require('../set');

module.exports = dir => (acc, file) =>
  set(
    acc,
    convertToCamelCase(file),
    require(path.join(process.cwd(), dir, file)),
  );
