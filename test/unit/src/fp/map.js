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
  const map = Symbol();

  const fixedArity2Fn = stub().returns(modifiedFnSymbol);

  mocks['../../lib/fixed-arity-2-fn-b-a-args'] = fixedArity2Fn;
  mocks['../../lib/map'] = map;

  it('should modify the base map function with the fixed arity 2 function', () => {
    const fpSet = proxyquire(tquire(__filename, false), mocks);

    expect(fixedArity2Fn).to.have.been.calledOnceWithExactly(map);
    expect(fpSet).to.equal(modifiedFnSymbol);
  });
});
