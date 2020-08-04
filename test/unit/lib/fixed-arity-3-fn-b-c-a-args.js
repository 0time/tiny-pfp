const { d, expect, tquire } = deps;

d(__filename, () => {
  const fixedArity3Fn = tquire(__filename);

  describe('given a function with 3 args', () => {
    const fn = (a, b, c) => 3 * a + 2 * b + 1 * c;

    const modifiedFn = fixedArity3Fn(fn);

    it('should allow currying', () =>
      expect([1, 2, 3].reduce((acc, ea) => acc(ea), modifiedFn)).to.equal(
        fn(3, 1, 2),
      ));

    it('should support all args at once', () =>
      expect(modifiedFn(6, 3, 9)).to.equal(fn(9, 6, 3)));

    it('should support 1 then 2', () =>
      expect(modifiedFn(12)(17, 46)).to.equal(fn(46, 12, 17)));

    it('should support 2 then 1', () =>
      expect(modifiedFn(12, 17)(46)).to.equal(fn(46, 12, 17)));
  });
});
