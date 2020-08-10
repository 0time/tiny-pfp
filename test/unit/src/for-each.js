const { d, expect, tquire } = deps;

const me = __filename;

d(me, () => {
  const forEach = tquire(me);
  const forEachLib = require('../../../src/lib/for-each');

  it('should expose the forEach lib', () =>
    expect(forEach).to.equal(forEachLib));
});
