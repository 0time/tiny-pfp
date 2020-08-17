const { d, expect, tquire } = deps;

const me = __filename;

d(me, () => {
  const unset = tquire(me);
  const unsetLib = require('../../../src/lib/unset');

  it('should expose the unset lib', () => expect(unset).to.equal(unsetLib));
});
