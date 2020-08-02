const bluebird = require('bluebird');
const { d, expect, sinon, tquire } = deps;

const me = __filename;

d(me, () => {
  describe('given a normal require', () => {
    const promiseProps = tquire(me);

    describe('and an object containing only promises for properties', () => {
      const obj = {
        a: Promise.resolve(1),
        b: Promise.resolve(2),
      };

      it('should resolve each', () =>
        expect(promiseProps(obj)).to.eventually.be.fulfilled.then(actual =>
          expect(actual).to.deep.equal({ a: 1, b: 2 }),
        ));

      describe('given a usingPromise(bluebird)', () => {
        const bluebirdPromiseProps = promiseProps.usingPromise(bluebird);

        it('should resolve each', () =>
          expect(bluebirdPromiseProps(obj)).to.eventually.be.fulfilled.then(
            actual => expect(actual).to.deep.equal({ a: 1, b: 2 }),
          ));
      });

      describe('given a custom promise lib', () => {
        const input = { a: Symbol() };
        const result = [Symbol()];
        const expected = { a: result[0] };

        const mockPromise = {
          all: sinon.stub().resolves(result),
        };

        const usingMock = promiseProps.usingPromise(mockPromise);

        it('should affect this instance of promiseProps', () =>
          expect(usingMock(input)).to.eventually.be.fulfilled.then(actual => {
            expect(mockPromise.all).to.have.been.calledOnceWithExactly([
              input.a,
            ]);
            expect(actual).to.deep.equal(expected);
          }));

        it('should not affect the underlying promiseProps', () =>
          expect(promiseProps(input)).to.eventually.be.fulfilled.then(actual =>
            expect(actual).to.deep.equal(input),
          ));
      });
    });
  });
});
