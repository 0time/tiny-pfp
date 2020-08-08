const {
  d,
  expect,
  sinon: { stub },
  tquire,
} = deps;

const me = __filename;

d(me, () => {
  const stringReplaceResult = Symbol();
  const needle = Symbol();
  const replacement = Symbol();
  const replace = tquire(me);

  let string = null;
  let stringReplace = null;

  beforeEach(() => {
    stringReplace = stub().returns(stringReplaceResult);

    string = {
      replace: stringReplace,
    };
  });

  it('should call replace on the string with the needle arg as the reducing function', () => {
    replace(string, needle, replacement);

    expect(stringReplace).to.have.been.calledOnceWithExactly(
      needle,
      replacement,
    );
  });

  it('should return the result of stringReplace', () =>
    expect(replace(string, needle, replacement)).to.equal(stringReplaceResult));
});
