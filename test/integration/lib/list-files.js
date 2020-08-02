const { bluebird, d, expect, path, tquire } = deps;

const me = path.relative(process.cwd(), __filename);

d(me, () => {
  describe('given a normal require', () => {
    const listFiles = tquire(__filename)({ Promise: bluebird });

    it('should detect this file in the list of files in the src directory', () =>
      expect(listFiles('test'))
        .to.eventually.be.fulfilled.then(result => result.find(x => x === me))
        .then(result => expect(result).to.equal(me)));
  });
});
