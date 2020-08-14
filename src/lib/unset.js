module.exports = (obj, bigKey) => {
  if (!(bigKey instanceof String || typeof bigKey === 'string')) {
    delete obj[bigKey];

    return obj;
  }

  const keys = bigKey.split('.');
  let key = null;

  let curr = obj;
  for (let i = 0; i < keys.length; ++i) {
    key = keys[i];

    if (i === keys.length - 1) {
      delete curr[key];
    } else {
      if (!Object.prototype.hasOwnProperty.call(curr, key)) {
        i = keys.length;
      }
    }

    curr = curr[key];
  }

  return obj;
};
