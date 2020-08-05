const flow = require('../../src/fp/flow');
const fpStringReplace = require('../../src/fp/string-replace');
const fpMap = require('../../src/fp/map');
const fpReduce = require('../../src/fp/reduce');
const listFilesSync = require('./list-files-sync');
const requireAllFileReducer = require('./require-all-file-reducer');

module.exports = dir =>
  flow([
    listFilesSync,
    fpMap(fpStringReplace(dir, '.')),
    fpReduce(requireAllFileReducer(dir), {}),
  ])(dir);
