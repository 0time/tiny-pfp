const {
  d,
  expect,
  sinon: { spy },
  tquire,
} = deps;

const me = __filename;

d(me, () => {
  describe('given a normal require', () => {
    let incrementer = null;
    let mapValues = null;
    let obj = null;

    beforeEach(() => {
      incrementer = spy(x => x + 1);
      mapValues = tquire(me);
      obj = { a: 1, b: 2, c: 6 };
    });

    describe('and a function which increments each value by one', () => {
      it('should increment each value by one, maintaining the keys', () => {
        expect(mapValues(obj, incrementer)).to.deep.equal({
          a: 2,
          b: 3,
          c: 7,
        });

        expect(incrementer.args).to.deep.equal([
          [1, 'a', obj],
          [2, 'b', obj],
          [6, 'c', obj],
        ]);
      });
    });
  });
});
