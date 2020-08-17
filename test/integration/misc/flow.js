const { d, expect, uuid } = deps;

const { fp } = require('../../../src');

const me = __filename;

d(me, () => {
  describe('messing around with get, set, and unset', () => {
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

    let obj = null;

    beforeEach(() => {
      obj = { [key1]: {} };
    });

    it('should do various things', () =>
      expect(
        fp.flow([
          fp.set(key, val),
          obj => {
            expect(obj).to.have.nested.property(key, val);

            return obj;
          },
          fp.unset(key),
          obj => {
            expect(obj).to.have.not.nested.property(key, val);

            return obj;
          },
          fp.set(key, val),
          fp.get(key),
        ])(obj),
      ).to.equal(val));
  });

  describe('messing around with map and reduce', () => {
    it('should do map, reduce', () =>
      expect(
        fp.flow([fp.map(i => i + 1), fp.reduce((a, b) => a + b, 0)])([
          1,
          2,
          3,
          4,
          5,
        ]),
      ).to.equal(20));
  });

  describe('messing around with pick and omit', () => {
    const symbolKey = Symbol();

    let key1 = null;
    let key2 = null;
    let nestedKey = null;
    let nestedValue = null;
    let stringValue = null;
    let symbolValue = null;
    let obj = null;
    let string = null;

    beforeEach(() => {
      key1 = `nested-${uuid()}`;
      key2 = `key-${uuid()}`;
      nestedKey = `${key1}.${key2}`;
      nestedValue = `nested-value-${uuid()}`;
      string = `string-${uuid()}`;
      stringValue = `string-value-${uuid()}`;
      symbolValue = `symbol-value-${uuid()}`;

      obj = {
        [key1]: { [key2]: nestedValue },
        [string]: stringValue,
        [symbolKey]: symbolValue,
      };
    });

    describe('pick', () => {
      it('should return a cloned object containing only picked keys', () =>
        expect(
          fp.flow([
            fp.pick([nestedKey, string, symbolKey]),
            clonedObject => {
              expect(clonedObject).to.have.nested.property(
                nestedKey,
                nestedValue,
              );
              expect(clonedObject).to.have.property(string, stringValue);
              expect(clonedObject).to.have.property(symbolKey, symbolValue);

              return obj;
            },
            fp.pick([nestedKey, symbolKey]),
            clonedObject => {
              expect(clonedObject).to.have.nested.property(
                nestedKey,
                nestedValue,
              );
              expect(clonedObject).to.not.have.property(string, stringValue);
              expect(clonedObject).to.have.property(symbolKey, symbolValue);

              return clonedObject;
            },
            fp.pick([nestedKey]),
            clonedObject => {
              expect(clonedObject).to.have.nested.property(
                nestedKey,
                nestedValue,
              );
              expect(clonedObject).to.not.have.property(string, stringValue);
              expect(clonedObject).to.not.have.property(symbolKey, symbolValue);

              return clonedObject;
            },
            fp.pick([]),
            clonedObject => {
              expect(
                obj,
                'the original object should be unmodified',
              ).to.deep.equal({
                [key1]: { [key2]: nestedValue },
                [string]: stringValue,
                [symbolKey]: symbolValue,
              });

              return clonedObject;
            },
          ])(obj),
        ).to.deep.equal({}));
    });

    describe('omit', () => {
      it('should return a cloned object containing all non-omitted keys', () =>
        expect(
          fp.flow([
            fp.omit([]),
            clonedObject => {
              expect(clonedObject).to.have.nested.property(
                nestedKey,
                nestedValue,
              );
              expect(clonedObject).to.have.property(string, stringValue);

              return obj;
            },
            fp.omit([string]),
            clonedObject => {
              expect(clonedObject).to.have.nested.property(
                nestedKey,
                nestedValue,
              );
              expect(clonedObject).to.not.have.property(string, stringValue);

              return clonedObject;
            },
            fp.omit([nestedKey]),
            clonedObject => {
              expect(fp.get(key1, clonedObject)).to.deep.equal({});
              expect(clonedObject).to.not.have.nested.property(
                nestedKey,
                nestedValue,
              );
              expect(clonedObject).to.not.have.property(string, stringValue);

              return clonedObject;
            },
            fp.omit([key1]),
            clonedObject => {
              expect(
                obj,
                'the original object should be unmodified',
              ).to.deep.equal({
                [key1]: { [key2]: nestedValue },
                [string]: stringValue,
                [symbolKey]: symbolValue,
              });

              return clonedObject;
            },
          ])(obj),
        ).to.deep.equal({}));
    });
  });
});
