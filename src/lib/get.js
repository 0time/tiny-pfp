const isString = require('./is-string');

module.exports = (obj, bigKey, defaultValue = undefined) => {
  if (!obj) {
    throw TypeError('The obj parameter was not a valid type');
  }

  let curr = obj;

  if (!isString(bigKey)) {
    curr = obj[bigKey];

    return curr === undefined ? defaultValue : curr;
  }

  const keys = bigKey.split('.');

  let key = null;

  for (let i = 0; i < keys.length; ++i) {
    key = keys[i];

    if (!Object.prototype.hasOwnProperty.call(curr, key)) {
      return defaultValue;
    }

    curr = curr[key];
  }

  return curr === undefined ? defaultValue : curr;
};
