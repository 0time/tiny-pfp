const chainIfThennable = require('./chain-if-thennable');

module.exports = fns => val => fns.reduce(chainIfThennable, val);
