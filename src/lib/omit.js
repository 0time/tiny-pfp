const clone = require('./clone');
const flow = require('../src/fp/flow');
const get = require('./get');
const isString = require('./is-string');
const negate = require('./negate');
const reduce = require('../src/fp/reduce');
const set = require('./set');
const unset = require('./unset');

const fpExcludes = ray => negate(val => ray.includes(val));

const MAX_ITERATIONS = 250;

module.exports = (obj, omitSet) => {
  let accKeys = [];
  let curr = obj;
  let i = 0;
  let first = true;
  let keys = [];
  let key = null;
  let newKeys = [];
  let objKeys = [];

  while (first || keys.length > 0) {
    first = false;

    if (keys.length > 0) {
      key = keys.pop();
      curr = get(obj, key);
    }

    ++i;

    if (!isString(curr)) {
      objKeys = Object.keys(curr);

      newKeys = objKeys
        .map(ea => (key === null ? ea : `${key}.${ea}`))
        .filter(fpExcludes(omitSet));

      keys = keys.concat(newKeys);

      accKeys = accKeys.concat(newKeys);
    }

    if (i > MAX_ITERATIONS) {
      // infinite loop protection?
      // should I use a hash map of memory locations if possible?
      // otherwise, what's a better way to do this?
      throw new Error(
        `iteration overrun ${i} > ${MAX_ITERATIONS} (i > MAX_ITERATIONS)`,
      );
    }
  }

  accKeys = accKeys.sort((a, b) => (a < b ? 1 : -1));

  return flow([
    reduce((acc, ea) => set(acc, ea, clone(get(obj, ea))), {}),
    initialAcc => omitSet.reduce((acc, ea) => unset(acc, ea), initialAcc),
  ])(accKeys);
};
