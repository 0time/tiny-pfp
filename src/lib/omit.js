const flow = require('../src/fp/flow');
const get = require('./get');
const fpIncludes = require('../src/fp/includes');
const negate = require('./negate');
const reduce = require('../src/fp/reduce');
const set = require('./set');
const unset = require('./unset');

const fpExcludes = ray => negate(fpIncludes(ray));

// TODO: Make this work for deep keys in an omitSet

module.exports = (obj, omitSet) => {
  let allKeys = [];
  let curr = obj;
  let keys = [];
  let key = null;
  let newKeys = [];
  let objKeys = [];

  // eslint-disable-next-line no-constant-condition
  while (true) {
    objKeys = Object.keys(curr);

    newKeys = objKeys
      .map(ea => (key === null ? ea : `${key}.${ea}`))
      .filter(fpExcludes(omitSet));

    keys = keys.concat(newKeys);

    allKeys = allKeys.concat(newKeys);

    console.error({
      allKeys,
      curr,
      key,
      newKeys,
      objKeys,
    });

    if (keys.length === 0) {
      break;
    }

    key = keys.pop();
    curr = get(obj, key);
  }

  allKeys = allKeys.sort((a, b) => (a < b ? 1 : -1));
  console.error({ allKeys });

  return flow([
    reduce((acc, ea) => console.error(acc) || set(acc, ea, get(obj, ea)), {}),
    initialAcc => omitSet.reduce((acc, ea) => unset(acc, ea), initialAcc),
  ])(allKeys);
};
/*
  Object.keys(obj)
    .filter(each => !omitSet.includes(each))
    .reduce((acc, key) => set(acc, key, get(obj, key)), {});
    */
