const get = require('./get');

const ABSENT_SYMBOL = Symbol();

module.exports = (obj, key) => {
  console.error(obj, get(obj, key, ABSENT_SYMBOL), ABSENT_SYMBOL);

  return get(obj, key, ABSENT_SYMBOL) !== ABSENT_SYMBOL;
};
