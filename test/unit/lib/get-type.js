const evaluatedSetOfEverything = require('../../lib/evaluated-set-of-everything');

const { d, expect, tquire } = deps;

const getType = tquire(__filename);

d(__filename, () => {
  it('should result in the expected type', () =>
    evaluatedSetOfEverything().forEach(({ evaluated, text, type }) => [
      expect(getType).to.be.a('function'),
      expect(getType(evaluated), text).to.equal(type),
    ]));
});
