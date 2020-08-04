const camelCase = require('../camel-case');

module.exports = str =>
  camelCase(str.replace(/\.js$/, '').replace(/^[./]*/, '')).replace(/\//g, '.');
