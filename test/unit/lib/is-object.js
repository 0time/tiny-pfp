const { d, nextInt, testRunner, tquire } = deps;

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

  /* This bit is useful for sanity checking */
  /*
  describe('test assumptions about _.isObject', () => {
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
  */

  const createTestFixturesCreator = (be, expected) => inputSets =>
    inputSets.map(input => ({
      description: `${JSON.stringify(
        input,
      )} aka ${input} should ${be} considered an object`,
      expected,
      functionToTest: isObject,
      input: () => input,
    }));

  /*
  const passSymbol = Symbol();

  const tryToString = val => {
    try {
      return val.toString();
    } catch (err) {
      return 'no-to-string-method-functionality';
    }
  };

  const secondaryTestFixturesCreator = pass => inputSets =>
    inputSets.map(input => ({
      description: `(${JSON.stringify(input)}) aka (${tryToString(
        input,
      )}) (typeof ${typeof input}) should ${
        pass ? 'succeed' : 'error'
      } when trying to Object.assign`,
      expected: passSymbol,
      functionToTest: () => {
        const key = nextInt(10, 2).toString();
        const expected = _.set(_.clone(input), key, 1);
        let result1 = null;
        let result2 = null;

        if (pass) {
          result1 = Object.assign({}, _.clone(input), { [key]: 1 });
          result2 = Object.assign(_.clone(input), { [key]: 1 });

          expect(result1).to.deep.equal(expected);
          expect(result2).to.deep.equal(expected);
        } else {
          try {
            result1 = Object.assign({}, _.clone(input), { [key]: 1 });
          } catch (err) {}

          try {
            result2 = Object.assign(_.clone(input), { [key]: 1 });
          } catch (err) {}

          expect(result1).to.deep.equal(input);
          expect(result2).to.deep.equal(input);
        }

        return passSymbol;
      },
      input,
    }));
  const secondaryPositiveTestFixtures = secondaryTestFixturesCreator(true)(
    positiveTests,
  );
  const secondaryNegativeTestFixtures = secondaryTestFixturesCreator(false)(
    negativeTests,
  );

  secondaryPositiveTestFixtures
    .concat(secondaryNegativeTestFixtures)
    .forEach(testRunner);
  */

  const positiveTestFixtures = createTestFixturesCreator('be', true)(
    positiveTests,
  );
  const negativeTestFixtures = createTestFixturesCreator('not be', false)(
    negativeTests,
  );

  positiveTestFixtures.concat(negativeTestFixtures).forEach(testRunner);
});
