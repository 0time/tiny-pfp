const {
  d,
  expect,
  sinon: { spy },
  tquire,
} = deps;

const me = __filename;

d(me, () => {
  describe('given a normal require', () => {
    const forEach = tquire(me);
    const obj = { a: 1, b: 2, c: 3 };

    const mockForEachFn = spy();

    it('should call the forEachFn once per key', () => {
      forEach(obj, mockForEachFn);

      expect(mockForEachFn.args).to.deep.equal([
        [1, 'a', obj],
        [2, 'b', obj],
        [3, 'c', obj],
      ]);
    });
  });
});
