module.exports = {
  get: require('./src/get.js'),
  mapValues: require('./src/map-values.js'),
  map: require('./src/map.js'),
  reduce: require('./src/reduce.js'),
  set: require('./src/set.js'),
  stringReplace: require('./src/string-replace.js'),
  lib: {
    index: require('./src/lib/index.js'),
  },
  fp: {
    chainIfThennable: require('./src/fp/chain-if-thennable.js'),
    flow: require('./src/fp/flow.js'),
    get: require('./src/fp/get.js'),
    mapValues: require('./src/fp/map-values.js'),
    map: require('./src/fp/map.js'),
    reduce: require('./src/fp/reduce.js'),
    set: require('./src/fp/set.js'),
    stringReplace: require('./src/fp/string-replace.js'),
  },
};
