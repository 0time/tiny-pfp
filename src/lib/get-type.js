const isArray = require('./is-array');
const isBoolean = require('./is-boolean');
const isError = require('./is-error');
const isFunction = require('./is-function');
const isNull = require('./is-null');
const isNumber = require('./is-number');
const isObject = require('./is-object');
const isString = require('./is-string');
const isUndefined = require('./is-undefined');

const associations = [
  { fn: isUndefined, type: 'undefined' },
  { fn: isNull, type: 'null' },
  { fn: isBoolean, type: 'boolean' },
  { fn: isNumber, type: 'number' },
  { fn: isArray, type: 'array' },
  { fn: isFunction, type: 'function' },
  { fn: isError, type: 'error' },
  { fn: isString, type: 'string' },
  { fn: isObject, type: 'object' },
];

module.exports = item =>
  associations.reduce(
    (acc, { fn, type }) => (acc !== false || !fn(item) ? acc : type),
    false,
  );
