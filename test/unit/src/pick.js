const { d, expect, tquire } = deps;

const me = __filename;

d(me, () => {
  const pick = tquire(me);
  const pickLib = require('../../../src/lib/pick');

  it('should expose the pick lib', () => expect(pick).to.equal(pickLib));
});
