const lodash = require('lodash');
const logIfTestingVerbose = require('./log-if-testing-verbose');
const tinyPfp = require('../../src/index');

const { expect, testRunner } = deps;

module.exports = functionName => {
  const lodashVersion = lodash[functionName];
  const tinyPfpVersion = tinyPfp[functionName];

  expect(lodashVersion).to.have.property('call');
  expect(tinyPfpVersion).to.have.property('call');
  expect(lodashVersion).to.not.equal(tinyPfpVersion);

  return (...input) =>
    new Promise(resolve =>
      describe(`tinyPfp.${functionName}`, () =>
        testRunner(
          logIfTestingVerbose({
            description: `should perform like lodash.${functionName}`,
            expected: () => lodashVersion(...lodash.cloneDeep(input)),
            functionToTest: () => tinyPfpVersion(...lodash.cloneDeep(input)),
            input: null,
          }),
        ).then(result => resolve(result))),
    );
};
