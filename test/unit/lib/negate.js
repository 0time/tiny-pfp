const { d, expect, tquire } = deps;

const negate = tquire(__filename);

d(__filename, () => {
  it('should negate the function', () => {
    expect(negate(() => true)()).to.equal(false);
    expect(negate(() => false)()).to.equal(true);
  });
});
