const {
  d,
  expect,
  pquire,
  sinon: { stub },
} = deps;

const me = __filename;

d(me, () => {
  const mocks = {};

  const modifiedFnSymbol = Symbol();
  const forEach = Symbol();

  const fixedArity2Fn = stub().returns(modifiedFnSymbol);

  mocks['../../lib/fixed-arity-2-fn-b-a-args'] = fixedArity2Fn;
  mocks['../../lib/for-each'] = forEach;

  it('should modify the base forEach function with the fixed arity 2 function', () => {
    expect(pquire(me, mocks)).to.equal(modifiedFnSymbol);

    expect(fixedArity2Fn).to.have.been.calledOnceWithExactly(forEach);
  });
});
