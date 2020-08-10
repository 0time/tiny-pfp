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
  const pick = Symbol();

  const fixedArity2Fn = stub().returns(modifiedFnSymbol);

  mocks['../../lib/fixed-arity-2-fn-b-a-args'] = fixedArity2Fn;
  mocks['../../lib/pick'] = pick;

  it('should modify the base pick function with the fixed arity 2 function', () => {
    const fpGet = proxyquire(tquire(__filename, false), mocks);

    expect(fixedArity2Fn).to.have.been.calledOnceWithExactly(pick);
    expect(fpGet).to.equal(modifiedFnSymbol);
  });
});
