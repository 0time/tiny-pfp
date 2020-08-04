const { d, expect, tquire, uuid } = deps;

const get = tquire(__filename);

d(__filename, () => {
  const defaultValue = Symbol();
  const val = Symbol();

  let obj = null;

  describe('given a non-string key', () => {
    const key = Symbol();

    describe('given an empty obj reference', () => {
      beforeEach(() => {
        obj = null;
      });

      it('should throw a TypeError', () =>
        expect(() => get(obj, key)).to.throw(TypeError));
    });

    describe('given a valid obj reference', () => {
      beforeEach(() => {
        obj = { [key]: val };
      });

      it('should get the value from the obj', () =>
        expect(get(obj, key)).to.have.equal(val));
    });
  });

  describe('given a string key', () => {
    const key = uuid();

    describe('given an empty obj reference', () => {
      beforeEach(() => {
        obj = null;
      });

      it('should throw a TypeError', () =>
        expect(() => get(obj, key)).to.throw(TypeError));
    });

    describe('given a valid obj reference', () => {
      beforeEach(() => {
        obj = { [key]: val };
      });

      it('should get the value from the obj', () =>
        expect(get(obj, key)).to.equal(val));
    });
  });

  describe('given a nested string key', () => {
    let key = null;
    let key1 = null;
    let key2 = null;

    beforeEach(() => {
      key1 = uuid();
      key2 = uuid();
      key = `${key1}.${key2}`;
    });

    describe('given an empty obj reference', () => {
      beforeEach(() => {
        obj = null;
      });

      it('should throw a TypeError', () =>
        expect(() => get(obj, key)).to.throw(TypeError));

      describe('given a valid obj reference', () => {
        beforeEach(() => {
          obj = { [key1]: { [key2]: val } };
        });

        it('should get the nested value from the obj', () =>
          expect(get(obj, key)).to.equal(val));

        describe('given one key is set', () => {
          beforeEach(() => {
            obj = { [key1]: {} };
          });

          it('should return the default value', () =>
            expect(get(obj, key, defaultValue)).to.equal(defaultValue));
        });

        describe('given the key is not set', () => {
          beforeEach(() => {
            obj = {};
          });

          it('should return the default value', () =>
            expect(get(obj, key, defaultValue)).to.equal(defaultValue));
        });

        describe('given that the key is set to undefined', () => {
          beforeEach(() => {
            obj = { [key1]: { [key2]: undefined } };
          });

          it('should return the default value', () =>
            expect(get(obj, key, defaultValue)).to.equal(defaultValue));
        });
      });
    });
  });
});
