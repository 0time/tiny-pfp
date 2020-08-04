module.exports = (obj, bigKey, defaultValue = undefined) => {
  if (!obj) {
    throw TypeError('The obj parameter was not a valid type');
  }

  if (!(bigKey instanceof String || typeof bigKey === 'string')) {
    return obj[bigKey];
  }

  const keys = bigKey.split('.');

  let curr = obj;
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
