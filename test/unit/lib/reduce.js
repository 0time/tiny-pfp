const {
  d,
  expect,
  sinon: { stub },
  tquire,
} = deps;

const me = __filename;

d(me, () => {
  const arrayReduceResult = Symbol();
  const fn = Symbol();
  const initialAccumulator = Symbol();
  const reduce = tquire(me);

  let array = null;
  let arrayReduce = null;

  beforeEach(() => {
    arrayReduce = stub().returns(arrayReduceResult);

    array = {
      reduce: arrayReduce,
    };
  });

  it('should call reduce on the array with the fn arg as the reducing function', () => {
    reduce(array, fn, initialAccumulator);

    expect(arrayReduce).to.have.been.calledOnceWithExactly(
      fn,
      initialAccumulator,
    );
  });

  it('should return the result of arrayReduce', () =>
    expect(reduce(array, fn, initialAccumulator)).to.equal(arrayReduceResult));
});
