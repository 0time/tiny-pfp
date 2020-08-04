const { d, expect, tquire } = deps;

const me = __filename;

d(me, () => {
  const map = tquire(me);
  const mapLib = require('../../../src/lib/map');

  it('should expose the map lib', () => expect(map).to.equal(mapLib));
});
