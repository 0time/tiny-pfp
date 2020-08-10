const zip = require('./zip');

module.exports = (obj, fn) => {
  const keys = Object.keys(obj);

  return keys.map(key => fn(obj[key], key, obj)).reduce(zip(keys), {});
};
