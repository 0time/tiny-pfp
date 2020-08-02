const zip = require('./zip');

const promiseProps = function(obj, promLib = Promise) {
  return promLib
    .all(Object.values(obj))
    .then(results => results.reduce(zip(Object.keys(obj)), {}));
};

promiseProps.usingPromise = promLib => obj => promiseProps(obj, promLib);

module.exports = promiseProps;
