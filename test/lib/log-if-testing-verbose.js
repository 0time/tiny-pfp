module.exports = obj => {
  if (process.env.TESTING_VERBOSE !== undefined) {
    console.error(obj); // eslint-disable-line no-console
  }

  return obj;
};
