const { d, expect, tquire } = deps;

const proxyquire = require('proxyquire')
  .noPreserveCache()
  .noCallThru();

const me = __filename;

d(me, () => {
  // An array of objects with an arg: [] and returnValue: <object>|<array>|<primitive>|etc.
  let reduceToTypesSyncReturnList = [];
  let reduceToTypesSync = null;
  let mocks = null;
  let listFilesSync = null;

  const initializeListFilesSync = () => {
    mocks = {};

    reduceToTypesSync = inp =>
      reduceToTypesSyncReturnList.find(({ args }) => args === inp).returnValue;

    mocks['./reduce-to-types-sync'] = reduceToTypesSync;

    listFilesSync = proxyquire(tquire(me, false), mocks);
  };

  describe('given a single folder with files', () => {
    const args = Symbol();
    const files = [Symbol()];

    const returnValue = {
      directories: [],
      files,
    };

    beforeEach(() => {
      reduceToTypesSyncReturnList.push({
        args,
        returnValue,
      });

      initializeListFilesSync();
    });

    it('should return the files', () =>
      expect(listFilesSync(args)).to.deep.equal(files));
  });

  describe('given /bla, /bla2/bla with initial dir /', () => {
    const args = '/';
    beforeEach(() => {
      reduceToTypesSyncReturnList.push({
        args,
        returnValue: {
          directories: ['/bla2'],
          files: ['/bla'],
        },
      });

      reduceToTypesSyncReturnList.push({
        args: '/bla2',
        returnValue: {
          directories: [],
          files: ['/bla2/bla'],
        },
      });

      initializeListFilesSync();
    });

    it('should return the full list of files', () =>
      expect(listFilesSync(args)).to.deep.equal(['/bla', '/bla2/bla']));
  });
});
