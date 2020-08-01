const zip = require('./zip');

const mapValues = (obj, fn) => {
  const keys = Object.keys(obj);

  return keys.map(key => fn(obj[key], key)).reduce(zip(keys), {});
};

module.exports = mapValues;
