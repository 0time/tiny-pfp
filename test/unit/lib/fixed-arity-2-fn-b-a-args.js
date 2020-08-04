const { d, expect, tquire } = deps;

d(__filename, () => {
  const fixedArity2Fn = tquire(__filename);

  describe('given a function with 2 args', () => {
    const fn = (a, b) => 2 * a + 1 * b;

    const modifiedFn = fixedArity2Fn(fn);

    it('should allow currying', () =>
      expect([1, 2].reduce((acc, ea) => acc(ea), modifiedFn)).to.equal(
        fn(2, 1),
      ));

    it('should support all args at once', () =>
      expect(modifiedFn(6, 3)).to.equal(fn(3, 6)));
  });
});
