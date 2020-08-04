// TODO: Migrate me to an ultra-light library
//
// TODO: requireAll should be a prebuild, precommit, and prestart hook to generate
// an index.js rather than something that runs every single time the application is
// launched.

const requireAllSync = require('./require-all-sync');

module.exports = requireAllSync;
