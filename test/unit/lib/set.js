const { d, expect, tquire, uuid } = deps;

const set = tquire(__filename);

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
        expect(() => set(obj, key, val)).to.throw(TypeError));
    });

    describe('given a valid obj reference', () => {
      beforeEach(() => {
        obj = {};
      });

      it('should set the value to the obj', () => {
        set(obj, key, val);

        expect(obj).to.have.property(key, val);
      });

      describe('given the key is already set', () => {
        beforeEach(() => {
          obj = { [key]: Symbol() };
        });

        it('should overwrite the value', () => {
          set(obj, key, val);

          expect(obj).to.have.property(key, val);
        });
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
        expect(() => set(obj, key, val)).to.throw(TypeError));
    });

    describe('given a valid obj reference', () => {
      beforeEach(() => {
        obj = {};
      });

      it('should set the value to the obj', () => {
        set(obj, key, val);

        expect(obj).to.have.property(key, val);
      });

      describe('given the key is already set', () => {
        beforeEach(() => {
          obj = { [key]: Symbol() };
        });

        it('should overwrite the value', () => {
          set(obj, key, val);

          expect(obj).to.have.property(key, val);
        });
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
        expect(() => set(obj, key, val)).to.throw(TypeError));

      describe('given a valid obj reference', () => {
        beforeEach(() => {
          obj = {};
        });

        it('should set the nested value to the obj', () => {
          set(obj, key, val);

          expect(obj).to.have.nested.property(key, val);
        });

        describe('given one key is set', () => {
          beforeEach(() => {
            obj = { [key1]: {} };
          });

          it('should write the value', () => {
            set(obj, key, val);

            expect(obj).to.have.nested.property(key, val);
          });
        });

        describe('given the key is not set', () => {
          beforeEach(() => {
            obj = {};
          });

          it('should write the value', () => {
            set(obj, key, val);

            expect(obj).to.have.nested.property(key, val);
          });
        });

        describe('given the key is already set', () => {
          beforeEach(() => {
            obj = { [key]: Symbol() };
          });

          it('should overwrite the value', () => {
            set(obj, key, val);

            expect(obj).to.have.nested.property(key, val);
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
        obj = {};
      });

      it('should not throw', () =>
        expect(() => set(obj, key, val)).to.not.throw());

      it('should return the object with that key set to the value', () =>
        expect(set(obj, key, val)).to.deep.equal({
          [key1]: { [key1]: { [key1]: val } },
        }));
    });
  });
});
