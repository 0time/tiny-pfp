const { d, testRunner, tquire, uuid } = deps;

const isUndefined = tquire(__filename);

d(__filename, () => {
  [undefined]
    .map(input => ({
      description: `should return true for valid string input ${input}`,
      expected: true,
      functionToTest: isUndefined,
      input,
    }))
    .forEach(testRunner);

  [
    `a-string-${uuid()}`,
    new String(`new String('${uuid()}')`),
    '',
    null,
    0,
    true,
    false,
    {},
    new Object(),
    [],
    new Array(),
  ]
    .map(input => ({
      description: `should return false for non-string input ${input}`,
      expected: false,
      functionToTest: isUndefined,
      input,
    }))
    .forEach(testRunner);
});
