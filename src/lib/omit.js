const get = require('./get');
const set = require('./set');

// TODO: Make this work for deep keys in an omitStrategy

module.exports = (obj, omitSet) =>
  Object.keys(obj)
    .filter(each => !omitSet.includes(each))
    .reduce((acc, key) => set(acc, key, get(obj, key)), {});
