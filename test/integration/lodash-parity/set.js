const runTestCreator = require('../../lib/run-lodash-parity-test-creator');
const runFpTestCreator = require('../../lib/run-lodash-fp-parity-test-creator');

const { _, d, expect, nextInt } = deps;

const me = __filename;

d(me, () => {
  const runTest = runTestCreator('set');
  const runFpTest = runFpTestCreator('set');

  const A = () => ({
    a: function a() {
      return 5;
    },
  });

  const B = () => _.set(_.cloneDeep(A()), 'a.b', 6);

  const setsOfArgs = [[A(), 'a.b', 6], [B(), 'a.a.b', 7]];

  // This is just a double check
  const extraExpectations = [
    result => {
      expect(result.a()).to.equal(5);
      expect(result.a.b).to.equal(6);
    },
    result => {
      expect(result.a()).to.equal(5);
      expect(result.a.b).to.equal(6);
      expect(result.a.a.b).to.equal(7);
    },
  ];

  it('double check lodash results', () => {
    const dup = _.cloneDeep(setsOfArgs);

    dup.forEach((ea, index) => {
      const result = _.set(...ea);

      if (index < extraExpectations.length) {
        extraExpectations[index](result);
      }
    });
  });

  Promise.all(setsOfArgs.map(args => runTest(...args))).then(results =>
    results.map((result, index) => {
      if (index < extraExpectations.length) {
        extraExpectations[index](result);
      }

      return result;
    }),
  );

  Promise.all(setsOfArgs.map(args => runFpTest(...args))).then(results =>
    results.map((result, index) => {
      if (index < extraExpectations.length) {
        extraExpectations[index](result);
      }

      return result;
    }),
  );

  describe('non-fp only tests', () => {
    [true, false, null, undefined, 0, NaN, '', 'a-string']
      .map(a => ({ a }))
      .map(obj => runTest(obj, 'a.b', nextInt()));
  });

  // These are known inconsistencies, you can enable these tests to see the differences
  describe.skip('Inconsistency tests', () => {
    describe('should be the same as lodash, but lodash/fp.set behaves differently than lodash.set', () => {
      [true, false, null, undefined, 0, NaN, '', 'a-string']
        .map(a => ({ a }))
        .map(obj => runFpTest(obj, 'a.b', nextInt()));
    });
  });
});
