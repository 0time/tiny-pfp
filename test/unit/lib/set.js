const { d, expect, tquire, uuid } = deps;

const isObject = require('../../../src/lib/is-object');
const set = tquire(__filename);

d(__filename, () => {
  const val = Symbol();

  let obj = null;

  beforeEach(() => {
    obj = {};
  });

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
    });

    describe('given a valid obj reference', () => {
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

  describe('given a repeated key', () => {
    let key1 = null;
    let key = null;

    beforeEach(() => {
      key1 = uuid();
      key = `${key1}.${key1}.${key1}`;
    });

    describe('and an empty object', () => {
      it('should not throw', () =>
        expect(() => set(obj, key, val)).to.not.throw());

      it('should return the object with that key set to the value', () =>
        expect(set(obj, key, val)).to.deep.equal({
          [key1]: { [key1]: { [key1]: val } },
        }));
    });
  });

  describe('given a promotion case', () => {
    let key1 = null;
    let key2 = null;
    let key2Val = null;

    beforeEach(() => {
      key1 = uuid();
      key2 = uuid();
      key2Val = uuid();
    });

    describe('and a bool set to true', () => {
      let bool = null;

      beforeEach(() => {
        bool = true;
      });

      it('should pass a comparison with true', () => {
        set(obj, key1, bool);

        set(obj, `${key1}.${key2}`, key2Val);

        expect(obj[key1].valueOf() === true, obj[key1]).to.equal(true);
        expect(obj[key1].valueOf() == true).to.equal(true);
        expect(obj[key1][key2]).to.equal(key2Val);
      });
    });

    describe('and a bool set to false', () => {
      let bool = null;

      beforeEach(() => {
        bool = false;
      });

      it('should pass a comparison with false', () => {
        set(obj, key1, bool);

        set(obj, `${key1}.${key2}`, key2Val);

        expect(obj[key1].valueOf() === false, obj[key1]).to.equal(true);
        expect(obj[key1].valueOf() == false).to.equal(true);
        expect(obj[key1][key2]).to.equal(key2Val);
      });
    });

    describe('and a string set to a uuid', () => {
      let str = null;

      beforeEach(() => {
        str = uuid();
      });

      it('should pass a comparison with its previous value', () => {
        const saved = str;

        expect(isObject(saved)).to.equal(false);

        set(obj, key1, str);
        set(obj, `${key1}.${key2}`, key2Val);

        expect(obj[key1].valueOf()).to.equal(saved);
        expect(obj[key1][key2]).to.equal(key2Val);
      });
    });

    describe('and a number set to zero', () => {
      let num = null;

      beforeEach(() => {
        num = 0;
      });

      it('should pass a comparison with zero', () => {
        set(obj, key1, num);
        set(obj, `${key1}.${key2}`, key2Val);

        expect(obj[key1].valueOf()).to.equal(0);
        expect(obj[key1][key2]).to.equal(key2Val);
      });
    });

    describe('and a number set to one', () => {
      let num = null;

      beforeEach(() => {
        num = 1;
      });

      it('should pass a comparison with one', () => {
        set(obj, key1, num);
        set(obj, `${key1}.${key2}`, key2Val);

        expect(obj[key1].valueOf()).to.equal(1);
        expect(obj[key1][key2]).to.equal(key2Val);
      });
    });
  });
});
