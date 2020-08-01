module.exports = (appContext = { Promise }) => fn => (...args) =>
  new appContext.Promise((resolve, reject) =>
    fn(...args, (err, res) => (err ? reject(err) : resolve(res))),
  );
