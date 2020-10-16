const unevaluatedSetOfEverything = require('./unevaluated-set-of-everything');

module.exports = () =>
  unevaluatedSetOfEverything().map(({ text }) => {
    try {
      return eval(text);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(`when processing text '${text}' received err`);
      // eslint-disable-next-line no-console
      console.error(err);

      process.exit(-1);
    }
  });
