const { d, expect, tquire } = deps;

const me = __filename;

d(me, () => {
  const chainIfThennable = require('../../../../src/src/fp/chain-if-thennable');
  const flow = tquire(me);
  let fns = null;
  const reduceResult = Symbol();
  const valSymbol = Symbol();

  beforeEach(() => {
    fns = {
      reduce: (...args) => {
        expect(args).to.deep.equal([chainIfThennable, valSymbol]);

        fns.reduce = null;

        return reduceResult;
      },
    };
  });

  it('should call reduce on the functions using chainIfThennable and defaulting to the second arg', () =>
    expect(flow(fns)(valSymbol)).to.equal(reduceResult));
});
