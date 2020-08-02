module.exports = keys => (acc, val, i) =>
  Object.assign({ [keys[i]]: val }, acc);
