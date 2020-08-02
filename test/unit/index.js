const { d, expect, tquire } = deps;

d(__filename, () => {
  let index = null;

  beforeEach(() =>
    expect(tquire(__filename)({ Promise })).to.eventually.be.fulfilled.then(
      result => {
        index = result;
      },
    ),
  );

  it('should expose src/src/flow as {flow: <this>}', () =>
    expect(index.flow).to.equal(require('../../src/src/flow')));

  it('should expose src/src/chain-if-thennable as {chainIfThennable: <this>}', () =>
    expect(index.chainIfThennable).to.equal(
      require('../../src/src/chain-if-thennable'),
    ));
});
