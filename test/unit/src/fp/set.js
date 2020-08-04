const {
  d,
  expect,
  sinon: { stub },
  tquire,
} = deps;

const proxyquire = require('proxyquire')
  .noPreserveCache()
  .noCallThru();

d(__filename, () => {
  const mocks = {};

  const modifiedFnSymbol = Symbol();
  const set = Symbol();

  const fixedArity3Fn = stub().returns(modifiedFnSymbol);

  mocks['../../lib/fixed-arity-3-fn-b-c-a-args'] = fixedArity3Fn;
  mocks['../../lib/set'] = set;

  it('should modify the base set function with the fixed arity 3 function', () => {
    const fpSet = proxyquire(tquire(__filename, false), mocks);

    expect(fixedArity3Fn).to.have.been.calledOnceWithExactly(set);
    expect(fpSet).to.equal(modifiedFnSymbol);
  });
});
