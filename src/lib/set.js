const isBoolean = require('./is-boolean');
const isNull = require('./is-null');
const isNumber = require('./is-number');
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
        isBoolean(curr[key]) ||
        isNull(curr[key]) ||
        isUndefined(curr[key]) ||
        isNumber(curr[key]) ||
        isString(curr[key])
      ) {
        curr[key] = {};
      }
    }

    curr = curr[key];
  });

  return obj;
};
