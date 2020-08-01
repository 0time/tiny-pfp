const { d, expect, path, tquire, uuid } = deps;

const me = path.relative(process.cwd(), __filename);
const set = tquire(me);

d(me, () => {
  describe('setting with a deep property string', () => {
    let key;
    let key1;
    let key2;
    let key3;
    let val;

    beforeEach(() => {
      key1 = uuid();
      key2 = uuid();
      key3 = uuid();
      key = `${key1}/${key2}/${key3}`;
      val = Symbol();
    });

    it('should set the deep key with only the first set', () =>
      expect(set({ [key1]: {} }, key, val)).to.have.deep.property(key, val));
  });
});
