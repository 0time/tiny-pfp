const lodash = require('lodash');
const lodashFp = require('lodash/fp');
const logIfTestingVerbose = require('./log-if-testing-verbose');
const tinyPfp = require('../../src/index');

const { expect, testRunner } = deps;

module.exports = functionName => {
  const lodashVersion = lodashFp[functionName];
  const tinyPfpVersion = tinyPfp.fp[functionName];

  expect(lodashVersion).to.have.property('call');
  expect(tinyPfpVersion).to.have.property('call');
  expect(lodashVersion).to.not.equal(tinyPfpVersion);

  return (...input) =>
    new Promise(resolve =>
      describe(`tinyPfp.fp.${functionName}`, () =>
        testRunner(
          logIfTestingVerbose({
            description: `should perform like lodash.fp.${functionName}`,
            expected: () => {
              const cloneInput = lodash.cloneDeep(input);
              const first = cloneInput.shift();

              return lodashVersion(...cloneInput)(first);
            },
            functionToTest: () => {
              const cloneInput = lodash.cloneDeep(input);
              const first = cloneInput.shift();

              return tinyPfpVersion(...cloneInput)(first);
            },
            input: null,
          }),
        ).then(result => resolve(result))),
    );
};
