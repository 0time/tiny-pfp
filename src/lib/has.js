const get = require('./get');

const ABSENT_SYMBOL = Symbol();

module.exports = (obj, key) => get(obj, key, ABSENT_SYMBOL) !== ABSENT_SYMBOL;
