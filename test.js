/* eslint-disable */
const _ = require('lodash');
const t = require('./src/index');

const A = () => new String('a-string');
const B = () => ['magic'];
const C = () => ({ 0: 'magic' });

const theirs = _.merge({}, A(), B());
const mine = t.merge({}, A(), B());

console.error({
  a: mine[0],
  b: theirs[0],
  mine,
  theirs,
});
