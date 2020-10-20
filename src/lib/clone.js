const isArray = require('./is-array');
const isObject = require('./is-object');

module.exports = inp =>
  isArray(inp) ? [].concat(inp) : isObject(inp) ? Object.assign({}, inp) : inp;
