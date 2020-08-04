const { d, expect, tquire } = deps;

const me = __filename;

d(me, () => {
  const stringReplace = tquire(me);
  const stringReplaceLib = require('../../../src/lib/string/replace');

  it('should expose the stringReplace lib', () =>
    expect(stringReplace).to.equal(stringReplaceLib));
});
