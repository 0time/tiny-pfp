const { d, expect, path, tquire } = deps;

const me = path.relative(process.cwd(), __filename);
const set = tquire(me);

d(me, () => {
  const key = Symbol();
  const val = Symbol();

  describe('given an empty object', () => {
    let obj = null;

    beforeEach(() => {
      obj = {};
    });

    it('should set the key to the value and return the object', () => {
      expect(set(obj, key, val)).to.deep.equal({ [key]: val });
    });
  });
});
