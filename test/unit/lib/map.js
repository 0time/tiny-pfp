const {
  d,
  expect,
  sinon: { stub },
  tquire,
} = deps;

const me = __filename;

d(me, () => {
  const arrayMapResult = Symbol();
  const fn = Symbol();
  const map = tquire(me);

  let array = null;
  let arrayMap = null;

  beforeEach(() => {
    arrayMap = stub().returns(arrayMapResult);

    array = {
      map: arrayMap,
    };
  });

  it('should call map on the array with the fn arg as the mapping function', () => {
    map(array, fn);

    expect(arrayMap).to.have.been.calledOnceWithExactly(fn);
  });

  it('should return the result of arrayMap', () =>
    expect(map(array, fn)).to.equal(arrayMapResult));
});
