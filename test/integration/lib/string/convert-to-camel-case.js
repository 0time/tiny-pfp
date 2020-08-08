const { d, expect, tquire } = deps;

const me = __filename;

d(me, () => {
  const convertToCamelCase = tquire(me);

  it('should convert a file path to dot notation camel case and erase the .js extension', () =>
    expect(convertToCamelCase('/path/to/a-file.js')).to.equal('path.to.aFile'));
});
