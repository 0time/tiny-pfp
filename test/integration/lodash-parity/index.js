const lodash = require('lodash');
const lodashFp = require('lodash/fp');
const tinyPfp = require('../../../src/index');

const { d, testRunner } = deps;

const me = __filename;

const logIfTestingVerbose = obj => {
  if (process.env.TESTING_VERBOSE !== undefined) {
    console.error(obj); // eslint-disable-line no-console
  }

  return obj;
};

d(me, () => {
  const runTestCreator = functionName => (...input) =>
    describe(`tinyPfp.${functionName}`, () =>
      testRunner(
        logIfTestingVerbose({
          description: `should perform like lodash.${functionName}`,
          expected: lodash[functionName](...input),
          functionToTest: () => tinyPfp[functionName](...input),
          input: null,
        }),
      ));

  const runFpTestCreator = functionName => (...input) =>
    describe(`tinyPfp.fp.${functionName}`, () =>
      testRunner(
        logIfTestingVerbose({
          description: `should perform like lodash.fp.${functionName}`,
          expected: lodashFp[functionName](...input),
          functionToTest: () => tinyPfp.fp[functionName](...input),
          input: null,
        }),
      ));

  const square = x => x * x;

  describe('array functions', () => {
    const setsOfArgs = [
      [[], square],
      [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], square],
    ];

    const rotateAToEnd = array => array.slice(1).concat([array[0]]);
    const runMapTest = runTestCreator('map');
    const runFpMapTest = runFpTestCreator('map');

    setsOfArgs.forEach(ea => {
      runMapTest(...ea);
      runFpMapTest(...rotateAToEnd(ea));
    });
  });
});
