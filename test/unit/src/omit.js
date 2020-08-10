const { d, expect, tquire } = deps;

const me = __filename;

d(me, () => {
  const omit = tquire(me);
  const omitLib = require('../../../src/lib/omit');

  it('should expose the omit lib', () => expect(omit).to.equal(omitLib));
});
