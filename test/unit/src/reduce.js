const { d, expect, tquire } = deps;

const me = __filename;

d(me, () => {
  const reduce = tquire(me);
  const reduceLib = require('../../../src/lib/reduce');

  it('should expose the reduce lib', () => expect(reduce).to.equal(reduceLib));
});
