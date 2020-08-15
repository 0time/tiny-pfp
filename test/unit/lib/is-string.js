const { d, testRunner, tquire, uuid } = deps;

const isString = tquire(__filename);

d(__filename, () => {
  [`a-string-${uuid()}`, new String(`new String('${uuid()}')`)]
    .map(input => ({
      description: `should return true for valid string input ${input}`,
      expected: true,
      functionToTest: isString,
      input,
    }))
    .forEach(testRunner);

  [undefined, 0, true, false, {}, new Object(), [], new Array()]
    .map(input => ({
      description: `should return false for non-string input ${input}`,
      expected: false,
      functionToTest: isString,
      input,
    }))
    .forEach(testRunner);
});
