const clone = require('./clone');
const flow = require('../src/fp/flow');
const get = require('./get');
const negate = require('./negate');
const reduce = require('../src/fp/reduce');
const set = require('./set');
const unset = require('./unset');

const fpExcludes = ray => negate(val => ray.includes(val));

const MAX_ITERATIONS = 250;

// TODO: Make this work for deep keys in an omitSet

module.exports = (obj, omitSet) => {
  let allKeys = [];
  let curr = obj;
  let i = 0;
  let keys = [];
  let key = null;
  let newKeys = [];
  let objKeys = [];

  // eslint-disable-next-line no-constant-condition
  while (true) {
    ++i;

    if (!(['string'].includes(typeof curr) || curr instanceof String)) {
      objKeys = Object.keys(curr);

      newKeys = objKeys
        .map(ea => (key === null ? ea : `${key}.${ea}`))
        .filter(fpExcludes(omitSet));

      keys = keys.concat(newKeys);

      allKeys = allKeys.concat(newKeys);
    }

    if (i > MAX_ITERATIONS) {
      // infinite loop protection?
      // should I use a hash map of memory locations if possible?
      // otherwise, what's a better way to do this?
      throw new Error(
        `iteration overrun ${i} > ${MAX_ITERATIONS} (i > MAX_ITERATIONS)`,
      );
    }

    if (keys.length === 0) {
      break;
    }

    key = keys.pop();
    curr = get(obj, key);
  }

  allKeys = allKeys.sort((a, b) => (a < b ? 1 : -1));

  return flow([
    reduce((acc, ea) => set(acc, ea, clone(get(obj, ea))), {}),
    initialAcc => omitSet.reduce((acc, ea) => unset(acc, ea), initialAcc),
  ])(allKeys);
};
