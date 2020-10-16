module.exports = item => {
  const type = typeof item;

  return item !== null && (type === 'object' || type === 'function');
};
