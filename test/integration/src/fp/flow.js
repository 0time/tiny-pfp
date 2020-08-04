const {
  bluebird,
  d,
  expect,
  path,
  sinon,
  sinon: { stub },
  tquire,
} = deps;

const me = path.relative(process.cwd(), __filename);
const { fp } = require('../../../../src');

d(me, () => {
  const inc = x => x + 1;

  describe('given an incrementing function and a flow with multiple calls to that', () => {
    it('should increment each time', () => {
      expect(fp.flow([inc, inc, inc])(1)).to.equal(4);
    });
  });

  describe('given something akin to lodash/fp.set', () => {
    it('set should be able to set multiple fields on an arg', () =>
      expect(
        fp.flow([fp.set('a.b', 'a.b'), fp.set('c.d', 'c.d')])({}),
      ).to.deep.equal({
        a: {
          b: 'a.b',
        },
        c: {
          d: 'c.d',
        },
      }));
  });

  describe('given one function which uses a promise', () => {
    const theFlow = fp.flow([
      fp.set('a.b', 'a.b'),
      obj => new Promise(resolve => resolve(fp.set('c.d', 'c.d', obj))),
      fp.set('e.f', 'e.f'),
    ]);

    it('should still chain them', () =>
      theFlow({}).then(result =>
        expect(result).to.deep.equal({
          a: {
            b: 'a.b',
          },
          c: {
            d: 'c.d',
          },
          e: {
            f: 'e.f',
          },
        }),
      ));
  });

  const bluebirdResolution = Symbol();
  const nativeResolution = Symbol();

  const bluebirdMe = stub()
    .usingPromise(bluebird)
    .resolves(bluebirdResolution);
  const promiseMe = stub().resolves(nativeResolution);

  const gaveSymbol = Symbol();
  const giveSymbol = Symbol();

  const gaveMe = stub().returns(gaveSymbol);
  const giveMe = stub().returns(giveSymbol);

  const input = Symbol();
  const inputPromise = Promise.resolve(input);

  const flow = tquire(__filename);

  afterEach(() => sinon.resetHistory());

  const promiseFulfillment = (fn, value) =>
    expect(fn(value)).to.eventually.be.fulfilled;

  describe('given only functions which return', () => {
    const fn = flow([gaveMe, giveMe]);

    describe('given a synchronous input', () => {
      let actual = null;

      beforeEach(() => {
        actual = fn(input);
      });

      it('should return the result from the final function synchronously', () =>
        expect(actual).to.equal(giveSymbol));

      it('should call the first function with the input', () =>
        expect(gaveMe).to.have.been.calledOnceWithExactly(input));

      it('should call the second function with the result of the first', () =>
        expect(giveMe).to.have.been.calledOnceWithExactly(gaveSymbol));
    });

    describe('given an asynchronous input', () => {
      let actual = null;

      beforeEach(() =>
        promiseFulfillment(fn, inputPromise).then(result => {
          actual = result;
        }),
      );

      it('should return the result from the final function asynchronously', () =>
        expect(actual).to.equal(giveSymbol));

      it('should call the first function with the resolution of the input', () =>
        expect(gaveMe).to.have.been.calledOnceWithExactly(input));
    });
  });

  describe('given a mix of functions which return and promise', () => {
    const fn = flow([gaveMe, promiseMe, giveMe, bluebirdMe]);

    describe('given an asynchronous input', () => {
      let actual = null;

      beforeEach(() =>
        promiseFulfillment(fn, inputPromise).then(result => {
          actual = result;
        }),
      );

      it('should return the result from the final function asynchronously', () =>
        expect(actual).to.equal(bluebirdResolution));
    });

    describe('given a synchronous input', () => {
      let actual = null;

      beforeEach(() =>
        promiseFulfillment(fn, input).then(result => {
          actual = result;
        }),
      );

      it('should return the result from the final function asynchronously', () =>
        expect(actual).to.equal(bluebirdResolution));
    });
  });

  describe('given only functions which promise', () => {
    const fn = flow([bluebirdMe, promiseMe]);

    describe('given a synchronous input', () => {
      let actual = null;

      beforeEach(() =>
        promiseFulfillment(fn, input).then(result => {
          actual = result;
        }),
      );

      it('should return the result from the final function asynchronously', () =>
        expect(actual).to.equal(nativeResolution));
    });

    describe('given an asynchronous input', () => {
      let actual = null;

      beforeEach(() =>
        promiseFulfillment(fn, inputPromise).then(result => {
          actual = result;
        }),
      );

      it('should return the result from the final function asynchronously', () =>
        expect(actual).to.equal(nativeResolution));
    });
  });
});
