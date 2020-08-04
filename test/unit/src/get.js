const { d, expect, tquire } = deps;

const me = __filename;

d(me, () => {
  const get = tquire(me);
  const getLib = require('../../../src/lib/get');

  it('should expose the get lib', () => expect(get).to.equal(getLib));
});
