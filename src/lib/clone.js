module.exports = inp =>
  typeof inp === 'object' ? Object.assign({}, inp) : inp;
