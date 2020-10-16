const { _, d, expect, nextInt, testRunner, tquire } = deps;

const me = __filename;

d(me, () => {
  const isObject = tquire(me);

  const positiveTests = [
    new Object(),
    {},
    { a: 1 },
    new Array(),
    [],
    [1],
    new Boolean(),
    new Boolean(true),
    new Boolean(false),
    new Number(),
    new Number(1),
    new String(),
    new String(''),
    new String('a-new-string'),
    () => ({}),
    function() {},
    function a() {},
  ];

  const negativeTests = [
    false,
    true,
    '',
    0,
    nextInt(),
    -nextInt(),
    null,
    undefined,
  ];

  /* This is useful for sanity checking */
  describe.skip('test assumptions about _.isObject', () => {
    describe(`${_.isObject}`, () => {
      describe(`${isObject}`, () => {
        positiveTests.forEach(input => {
          it(`should detect ${JSON.stringify(
            input,
          )} aka ${input} (typeof ${typeof input}) to be an object`, () =>
            expect(_.isObject(input)).to.equal(true));
        });

        negativeTests.forEach(input => {
          it(`should detect ${JSON.stringify(
            input,
          )} aka ${input} (typeof ${typeof input}) to not be an object`, () =>
            expect(_.isObject(input)).to.equal(false));
        });
      });
    });
  });

  const createTestFixturesCreator = (be, expected) => inputSets =>
    inputSets.map(input => ({
      description: `${JSON.stringify(
        input,
      )} aka ${input} should ${be} considered an object`,
      expected,
      functionToTest: isObject,
      input: () => input,
    }));

  const positiveTestFixtures = createTestFixturesCreator('be', true)(
    positiveTests,
  );
  const negativeTestFixtures = createTestFixturesCreator('not be', false)(
    negativeTests,
  );

  positiveTestFixtures.concat(negativeTestFixtures).forEach(testRunner);
});
