const { d, expect, pquire, uuid } = deps;

const me = __filename;

d(me, () => {
  let mockNegate = null;
  let mocks = null;
  let negate = null;

  beforeEach(() => {
    mockNegate = `mock-negate-${uuid()}`;

    mocks = {};

    mocks['../../lib/negate'] = mockNegate;

    negate = pquire(me, mocks);
  });

  it('should expose the negate function', () =>
    expect(negate).to.equal(mockNegate));
});
