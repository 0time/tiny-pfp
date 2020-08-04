const { d, expect, tquire } = deps;

const me = __filename;

d(me, () => {
  const set = tquire(me);
  const setLib = require('../../../src/lib/set');

  it('should expose the set lib', () => expect(set).to.equal(setLib));
});
