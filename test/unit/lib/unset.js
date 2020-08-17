const { d, expect, tquire, uuid } = deps;

const unset = tquire(__filename);

d(__filename, () => {
  const val = Symbol();

  let obj = null;

  describe('given a non-string key', () => {
    const key = Symbol();

    describe('given an null obj reference', () => {
      beforeEach(() => {
        obj = null;
      });

      it('should throw a TypeError', () =>
        expect(() => unset(obj, key)).to.throw(TypeError));
    });

    describe('given a valid obj reference', () => {
      beforeEach(() => {
        obj = {};
      });

      it('should change nothing', () =>
        expect(unset(obj, key)).to.deep.equal({}));

      describe('given the key is already set', () => {
        beforeEach(() => {
          obj = { [key]: Symbol() };
        });

        it('should delete the value', () =>
          expect(unset(obj, key)).to.deep.equal({}));
      });
    });
  });

  describe('given a string key', () => {
    const key = uuid();

    describe('given an empty obj reference', () => {
      beforeEach(() => {
        obj = null;
      });

      it('should throw a TypeError', () =>
        expect(() => unset(obj, key)).to.throw(TypeError));
    });

    describe('given a valid obj reference', () => {
      beforeEach(() => {
        obj = {};
      });

      it('should not change the obj', () =>
        expect(unset(obj, key)).to.deep.equal({}));

      describe('given the key is already unset', () => {
        beforeEach(() => {
          obj = { [key]: Symbol() };
        });

        it('should delete the value', () =>
          expect(unset(obj, key)).to.deep.equal({}));
      });
    });
  });

  describe('given a nested string key', () => {
    let key = null;
    let key1 = null;
    let key2 = null;
    let key3 = null;

    beforeEach(() => {
      key1 = uuid();
      key2 = uuid();
      key3 = uuid();
      key = `${key1}.${key2}.${key3}`;
    });

    describe('given an empty obj reference', () => {
      beforeEach(() => {
        obj = null;
      });

      it('should throw a TypeError', () =>
        expect(() => unset(obj, key)).to.throw(TypeError));

      describe('given a valid obj reference', () => {
        beforeEach(() => {
          obj = {};
        });

        describe('given one key is not set', () => {
          beforeEach(() => {
            obj = { [key1]: {} };
          });

          it('should change nothing', () =>
            expect(unset(obj, key)).to.deep.equal({ [key1]: {} }));
        });

        describe('given the key is not set', () => {
          beforeEach(() => {
            obj = {};
          });

          it('should return the obj', () =>
            expect(unset(obj, key)).to.deep.equal({}));
        });

        describe('given the key is already set', () => {
          beforeEach(() => {
            obj = { [key]: Symbol() };
          });

          it('should delete the value', () => {
            unset(obj, key);

            expect(obj).to.not.have.nested.property(key, val);
          });
        });
      });
    });
  });

  describe('given a repeated key', () => {
    let key1 = null;
    let key = null;

    beforeEach(() => {
      key1 = uuid();
      key = `${key1}.${key1}.${key1}`;
    });

    describe('and an empty object', () => {
      let obj = null;

      beforeEach(() => {
        obj = { [key1]: { [key1]: { [key1]: val } } };
      });

      it('should not throw', () =>
        expect(() => unset(obj, key)).to.not.throw());

      it('should return the object with that key unset', () =>
        expect(unset(obj, key)).to.deep.equal({
          [key1]: { [key1]: {} },
        }));
    });
  });
});
