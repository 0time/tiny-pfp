const { d, expect, tquire } = deps;

const me = __filename;

d(me, () => {
  const chainIfThennable = tquire(me);
  const mockValue = 8;
  const square = x => x * x;

  describe('when given an input which does not have a .then property', () => {
    it('should perform the fn operation on the input', () =>
      expect(chainIfThennable(mockValue, square)).to.equal(square(mockValue)));
  });

  describe('when given an input which has a .then property', () => {
    const mockPromise = { then: fn => fn(mockValue) };

    it('should call it and give it the fn as the callback for the .then', () =>
      expect(chainIfThennable(mockPromise, square)).to.equal(
        square(mockValue),
      ));
  });
});
