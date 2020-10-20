const unevaluatedSetOfEverything = require('./unevaluated-set-of-everything');

module.exports = () =>
  unevaluatedSetOfEverything().map(ea =>
    Object.assign({}, ea, {
      evaluated: eval(ea.text),
    }),
  );
