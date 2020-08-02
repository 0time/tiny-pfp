const requireAll = require('./lib/require-all');

module.exports = appContext => requireAll(appContext)('./src/src');
