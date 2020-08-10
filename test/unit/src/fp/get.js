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
  const get = Symbol();

  const fixedArity2Fn = stub().returns(modifiedFnSymbol);

  mocks['../../lib/fixed-arity-2-fn-b-a-args'] = fixedArity2Fn;
  mocks['../../lib/get'] = get;

  it('should modify the base get function with the fixed arity 2 function', () => {
    expect(proxyquire(tquire(me, false), mocks)).to.equal(modifiedFnSymbol);

    expect(fixedArity2Fn).to.have.been.calledOnceWithExactly(get);
  });
});
