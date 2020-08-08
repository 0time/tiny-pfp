const { d, expect, uuid } = deps;

const { fp } = require('../../../src');

const me = __filename;

d(me, () => {
  let key = null;
  let key1 = null;
  let key2 = null;
  let val = null;

  beforeEach(() => {
    key1 = uuid();
    key2 = uuid();

    key = `${key1}.${key2}`;

    val = uuid();
  });

  describe('to-be-named', () => {
    let obj = null;

    beforeEach(() => {
      obj = { [key1]: {} };
    });

    it('should do stuff', () =>
      expect(fp.flow([fp.set(key, val), fp.get(key)])(obj)).to.equal(val));
  });
});
