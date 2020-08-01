module.exports = (obj, bigKey, val) => {
  if (!(bigKey instanceof String || typeof bigKey === 'string')) {
    obj[bigKey] = val;

    return obj;
  }

  const keys = bigKey.split('.');

  let curr = obj;
  keys.forEach((key, i) => {
    if (i === keys.length - 1) {
      curr[key] = val;
    } else {
      if (!Object.prototype.hasOwnProperty.call(obj, key)) {
        curr[key] = {};
      }
    }

    curr = curr[key];
  });

  return obj;
};
