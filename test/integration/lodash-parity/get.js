const runTestCreator = require('../../lib/run-lodash-parity-test-creator');
const runFpTestCreator = require('../../lib/run-lodash-fp-parity-test-creator');

const { d, nextInt } = deps;

const me = __filename;

d(me, () => {
  const runTest = runTestCreator('get');
  const runFpTest = runFpTestCreator('get');

  const obj = { a: undefined, b: null };
  const r = () => nextInt();

  const setsOfArgs = [[obj, 'a'], [obj, 'b'], [obj, r()]];

  setsOfArgs.forEach(args => runTest(...args));
  setsOfArgs.forEach(args => runFpTest(...args));
});
