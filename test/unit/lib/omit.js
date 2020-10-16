const set = require('../../../src/lib/set');

const { d, expect, tquire, uuid } = deps;

const me = __filename;

d(me, () => {
  const omit = tquire(me);

  let obj = {};

  describe('value special cases', () => {
    let stringKey = null;

    beforeEach(() => {
      stringKey = `string-key-${uuid()}`;
    });

    describe('string value', () => {
      let stringValue = null;

      beforeEach(() => {
        stringValue = `string-value-${uuid()}`;

        obj = { [stringKey]: stringValue };
      });

      it('should be omittable', () =>
        expect(omit(obj, [stringKey])).to.deep.equal({}));

      it('should stick around if not omitted', () =>
        expect(omit(obj, [])).to.deep.equal({ [stringKey]: stringValue }));

      it('should leave obj unchanged', () => {
        omit(obj, [stringKey]);

        expect(obj).to.deep.equal({ [stringKey]: stringValue });
      });
    });

    describe('array value', () => {
      let arrayValue = null;

      beforeEach(() => {
        arrayValue = [uuid(), uuid()];

        obj = { [stringKey]: arrayValue };
      });

      it('should be omittable', () =>
        expect(omit(obj, [stringKey])).to.deep.equal({}));

      // TODO: Fix me, major bug
      it('should stick around if not omitted', () =>
        expect(
          omit(set(obj, 'some-other-key', 1), ['some-other-key']),
        ).to.deep.equal({ [stringKey]: arrayValue }));

      it('should leave obj unchanged', () => {
        omit(obj, [stringKey]);

        expect(obj).to.deep.equal({ [stringKey]: arrayValue });
      });
    });

    describe('number value', () => {
      let numberValue = null;

      beforeEach(() => {
        numberValue = 7;

        obj = { [stringKey]: numberValue };
      });

      it('should be omittable', () =>
        expect(omit(obj, [stringKey])).to.deep.equal({}));

      it('should stick around if not omitted', () =>
        expect(omit(obj, [])).to.deep.equal({ [stringKey]: numberValue }));

      it('should leave obj unchanged', () => {
        omit(obj, [stringKey]);

        expect(obj).to.deep.equal({ [stringKey]: numberValue });
      });
    });
  });

  describe('shallow string keys', () => {
    beforeEach(() => {
      obj = { a: 1, b: 2, c: 3 };
    });

    it('should omit shallow keys', () =>
      expect(omit(obj, ['a', 'b'])).to.deep.equal({ c: 3 }));

    it('should have no effect with keys which are not present', () =>
      expect(omit(obj, ['d'])).to.deep.equal(obj));

    it('should support a mix of present and not present keys', () =>
      expect(omit(obj, ['b', 'd'])).to.deep.equal({ a: 1, c: 3 }));
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

    it('should omit shallow keys', () =>
      expect(omit(obj, [key1])).to.deep.equal({ [key2]: val2 }));

    it('should have no effect with keys which are not present', () =>
      expect(omit(obj, [Symbol()])).to.deep.equal(obj));

    it('should support a mix of present and not present keys', () =>
      expect(omit(obj, [key2, Symbol()])).to.deep.equal({ [key1]: val1 }));
  });

  describe('nested keys', () => {
    it('should omit nested keys', () =>
      expect(omit({ a: { b: 1, c: 2 }, d: 3 }, ['a.c'])).to.deep.equal({
        a: { b: 1 },
        d: 3,
      }));

    it('should be able to erase all nested keys but keep the root key', () =>
      expect(omit({ a: { b: 1, c: 2 }, d: 3 }, ['a.c', 'a.b'])).to.deep.equal({
        a: {},
        d: 3,
      }));

    it('should erase a key with multiple child properties', () =>
      expect(
        omit({ a: { b: { c: 1, d: 2 }, d: 3 }, e: 4 }, ['a']),
      ).to.deep.equal({
        e: 4,
      }));
  });

  describe('given a self-referential object', () => {
    let obj = null;

    beforeEach(() => {
      obj = {};
      obj.obj = obj;
    });

    it('should throw an error', () => expect(() => omit(obj, [])).to.throw());
  });
});
