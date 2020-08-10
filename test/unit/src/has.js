const { d, expect, tquire } = deps;

const me = __filename;

d(me, () => {
  const has = tquire(me);
  const hasLib = require('../../../src/lib/has');

  it('should expose the has lib', () => expect(has).to.equal(hasLib));
});
