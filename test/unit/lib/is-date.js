const { d, testRunner, tquire, uuid } = deps;

const isDate = tquire(__filename);

d(__filename, () => {
  [new Date()]
    .map(input => ({
      description: `should return true for valid date input ${input}`,
      expected: true,
      functionToTest: isDate,
      input,
    }))
    .forEach(testRunner);

  [
    '2020-01-01T00:00:00:000Z',
    '',
    `a-string-${uuid()}`,
    new String(`new String('${uuid()}')`),
    null,
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
      description: `should return false for non-date input ${input}`,
      expected: false,
      functionToTest: isDate,
      input,
    }))
    .forEach(testRunner);
});
