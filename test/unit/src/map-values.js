const { d, expect, tquire } = deps;

const me = __filename;

d(me, () => {
  const mapValues = tquire(me);
  const mapValuesLib = require('../../../src/lib/map-values');

  it('should expose the mapValues lib', () =>
    expect(mapValues).to.equal(mapValuesLib));
});
