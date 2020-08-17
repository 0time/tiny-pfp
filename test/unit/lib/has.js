const { d, expect, tquire, uuid } = deps;

const has = tquire(__filename);
const set = require('../../../src/lib/set');

d(__filename, () => {
  const val = Symbol();

  describe('given a shallow key', () => {
    let key = null;
    let obj = null;

    beforeEach(() => {
      key = uuid();
      obj = { [key]: val };
    });

    it('should return true if the key exists', () =>
      expect(has(obj, key)).to.equal(true));

    it('should return false if the key does not exist', () =>
      expect(has(obj, Symbol())).to.equal(false));

    it('should return false if the key does not exist', () =>
      expect(has({}, Symbol())).to.equal(false));

    it('should return false if the key does not exist', () =>
      expect(has(obj, `gibberish-key-${uuid()}`)).to.equal(false));

    it('should return false if the key does not exist', () =>
      expect(has({}, key)).to.equal(false));
  });

  describe('given a nested key', () => {
    let key = null;
    let key1 = null;
    let key2 = null;

    beforeEach(() => {
      key1 = uuid();
      key2 = uuid();

      key = `${key1}.${key2}`;
    });

    it('should return true if the key exists', () =>
      expect(has(set({}, key, val), key)).to.equal(true));

    it('should return false if a partial key exists but the full key does not', () =>
      expect(has(set({}, key1, val), key)).to.equal(false));

    it('should return false if the key does not exist', () =>
      expect(has({}, key)).to.equal(false));
  });
});
