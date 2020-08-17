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
  const stringReplace = Symbol();

  const fixedArity3Fn = stub().returns(modifiedFnSymbol);

  mocks['../../lib/fixed-arity-3-fn-b-c-a-args'] = fixedArity3Fn;
  mocks['../../lib/string/replace'] = stringReplace;

  it('should modify the base stringReplace function with the fixed arity 3 function', () => {
    expect(pquire(me, mocks)).to.equal(modifiedFnSymbol);

    expect(fixedArity3Fn).to.have.been.calledOnceWithExactly(stringReplace);
  });
});
