const { d, expect, tquire } = deps;

const me = __filename;

d(me, () => {
  const pick = tquire(me);

  let obj = {};

  describe('shallow string keys', () => {
    beforeEach(() => {
      obj = { a: 1, b: 2, c: 3 };
    });

    it('should pick shallow keys', () =>
      expect(pick(obj, ['a', 'b'])).to.deep.equal({ a: 1, b: 2 }));

    it('should return nothing for keys which are not present', () =>
      expect(pick(obj, ['d'])).to.deep.equal({}));

    it('should support a mix of present and not present keys', () =>
      expect(pick(obj, ['b', 'd'])).to.deep.equal({ b: 2 }));
  });

  describe('shallow non-string keys', () => {
    let key1 = null;
    let key2 = null;
    let val1 = null;
    let val2 = null;

    beforeEach(() => {
      key1 = Symbol();
      key2 = Symbol();

      val1 = Symbol();
      val2 = Symbol();

      obj = { [key1]: val1, [key2]: val2 };
    });

    it('should pick shallow keys', () =>
      expect(pick(obj, [key1])).to.deep.equal({ [key2]: val2 }));

    it('should return nothing for keys which are not present', () =>
      expect(pick(obj, [Symbol()])).to.deep.equal({}));

    it('should support a mix of present and not present keys', () =>
      expect(pick(obj, [key2, Symbol()])).to.deep.equal({ [key2]: val2 }));
  });

  describe('nested keys', () => {
    it('should pick nested keys', () =>
      expect(pick({ a: { b: 1, c: 2 }, d: 3 }, ['a.c'])).to.deep.equal({
        a: { c: 2 },
      }));
  });
});
