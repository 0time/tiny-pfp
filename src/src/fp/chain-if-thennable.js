module.exports = (input, fn) =>
  input && input.then ? input.then(fn) : fn(input);
