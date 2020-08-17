const get = require('./get');
const has = require('./has');
const set = require('./set');

module.exports = (obj, pickSet) =>
  pickSet.reduce(
    (acc, key) => (has(obj, key) ? set(acc, key, get(obj, key)) : acc),
    {},
  );
