const { d, expect, tquire } = deps;

const me = __filename;

d(me, () => {
  describe('given a normal require', () => {
    const mapValues = tquire(me);

    describe('and a function which increments each value by one', () => {
      it('should increment each value by one, maintaining the keys', () => {
        expect(mapValues({ a: 1, b: 2, c: 6 }, x => x + 1)).to.deep.equal({
          a: 2,
          b: 3,
          c: 7,
        });
      });
    });
  });
});
