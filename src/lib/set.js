const isBoolean = require('./is-boolean');
const isNull = require('./is-null');
const isNumber = require('./is-number');
const isObject = require('./is-object');
const isString = require('./is-string');
const isUndefined = require('./is-undefined');

module.exports = (obj, bigKey, val) => {
  if (!isString(bigKey)) {
    obj[bigKey] = val;

    return obj;
  }

  const keys = bigKey.split('.');

  let curr = obj;
  keys.forEach((key, i) => {
    if (i === keys.length - 1) {
      curr[key] = val;
    } else {
      if (
        !Object.prototype.hasOwnProperty.call(curr, key) ||
        isUndefined(curr[key]) ||
        isNull(curr[key])
      ) {
        curr[key] = {};
      } else if (!isUndefined(curr[key]) && !isObject(curr[key])) {
        // Be sure to use `.valueOf()` to get at the values if you want to use this preserved information...
        if (isBoolean(curr[key])) {
          curr[key] = new Boolean(curr[key]);
        } else if (isNumber(curr[key])) {
          curr[key] = new Number(curr[key]);
        } else if (isString(curr[key])) {
          curr[key] = new String(curr[key]);
        } else {
          throw new Error('unhandled primitive to object promotion');
        }
      }
    }

    curr = curr[key];
  });

  return obj;
};
