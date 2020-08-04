const { d, expect, path, tquire } = deps;

const me = path.relative(process.cwd(), __filename);

d(me, () => {
  describe('given a normal require', () => {
    const listFiles = tquire(__filename);

    it('should detect this file in the list of files in the src directory', () =>
      expect(listFiles('test').find(x => x === me)).to.equal(me));
  });
});
