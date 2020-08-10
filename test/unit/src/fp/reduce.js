const {
  d,
  expect,
  proxyquire,
  sinon: { stub },
  tquire,
} = deps;

const me = __filename;

d(me, () => {
  const mocks = {};

  const modifiedFnSymbol = Symbol();
  const reduce = Symbol();

  const fixedArity3Fn = stub().returns(modifiedFnSymbol);

  mocks['../../lib/fixed-arity-3-fn-b-c-a-args'] = fixedArity3Fn;
  mocks['../../lib/reduce'] = reduce;

  it('should modify the base reduce function with the fixed arity 3 function', () => {
    expect(proxyquire(tquire(me, false), mocks)).to.equal(modifiedFnSymbol);

    expect(fixedArity3Fn).to.have.been.calledOnceWithExactly(reduce);
  });
});
