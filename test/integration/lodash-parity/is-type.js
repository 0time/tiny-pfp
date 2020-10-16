const evaluatedSetOfEverything = require('../../lib/evaluated-set-of-everything');

const { _, d, expect } = deps;

const me = __filename;

d(me, () => {
  const tinyPfp = require('../../../src');

  it('should have parity for all the `is-?` functions', () =>
    [
      'isArray',
      'isBoolean',
      'isError',
      'isFunction',
      'isNull',
      'isNumber',
      'isObject',
      'isString',
      'isUndefined',
    ]
      .map(key =>
        Object.assign({
          ours: tinyPfp[key],
          theirs: _[key],
          key,
        }),
      )
      .forEach(({ key, ours, theirs }) =>
        evaluatedSetOfEverything().forEach(({ evaluated, text }) => [
          expect(ours, key).to.be.a('function'),
          expect(theirs, key).to.be.a('function'),
          expect(ours(evaluated), `${key} for ${text}`).to.equal(
            theirs(evaluated),
          ),
        ]),
      ));
});
