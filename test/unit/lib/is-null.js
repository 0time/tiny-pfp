const { d, testRunner, tquire, uuid } = deps;

const isNull = tquire(__filename);

d(__filename, () => {
  [null]
    .map(input => ({
      description: `should return true for valid string input ${input}`,
      expected: true,
      functionToTest: isNull,
      input,
    }))
    .forEach(testRunner);

  [
    `a-string-${uuid()}`,
    new String(`new String('${uuid()}')`),
    '',
    undefined,
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
      functionToTest: isNull,
      input,
    }))
    .forEach(testRunner);
});
