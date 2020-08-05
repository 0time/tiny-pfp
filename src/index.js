const path = require('path');
const requireAll = require('./lib/require-all');

module.exports = requireAll(path.resolve(__dirname, './src'));
