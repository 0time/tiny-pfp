module.exports = (input, fn) => (input.then ? input.then(fn) : fn(input));
