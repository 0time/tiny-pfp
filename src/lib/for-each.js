module.exports = (obj, fn) =>
  Object.keys(obj).forEach(key => fn(obj[key], key, obj));
