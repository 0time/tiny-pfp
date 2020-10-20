const runTestCreator = require('../../lib/run-lodash-parity-test-creator');
const runFpTestCreator = require('../../lib/run-lodash-fp-parity-test-creator');

const { d } = deps;

const me = __filename;

d(me, () => {
  const square = x => x * x;

  describe('array functions', () => {
    const setsOfArgs = [
      [[], square],
      [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], square],
    ];

    const runMapTest = runTestCreator('map');
    const runFpMapTest = runFpTestCreator('map');

    setsOfArgs.forEach(ea => {
      runMapTest(...ea);
      runFpMapTest(...ea);
    });
  });
});
