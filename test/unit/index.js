const { d, expect, tquire } = deps;

const index = tquire(__filename);

d(__filename, () => {
  it('should expose src/src/flow as {flow: <this>}', () =>
    expect(index.fp.flow).to.equal(require('../../src/src/fp/flow')));

  it('should expose src/src/chain-if-thennable as {chainIfThennable: <this>}', () =>
    expect(index.fp.chainIfThennable).to.equal(
      require('../../src/src/fp/chain-if-thennable'),
    ));
});
