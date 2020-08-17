const {
  d,
  expect,
  sinon: { stub },
  tquire,
} = deps;

const includes = tquire(__filename);

d(__filename, () => {
  const mockIncludesResult = Symbol();
  const mockValue = Symbol();

  let mockArray = null;
  let mockIncludes = null;

  beforeEach(() => {
    mockIncludes = stub().returns(mockIncludesResult);

    mockArray = {
      includes: mockIncludes,
    };
  });

  it('should compose array.includes(val) using the args (array, val)', () => {
    includes(mockArray, mockValue);

    expect(mockIncludes).to.have.been.calledOnceWithExactly(mockValue);
  });

  it('should return the result of the includes call', () =>
    expect(includes(mockArray, mockValue)).to.equal(mockIncludesResult));
});
