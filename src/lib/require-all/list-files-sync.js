const reduceToTypesSync = require('./reduce-to-types-sync');

module.exports = dir => {
  const types = { directories: [dir], files: [] };

  while (types.directories.length > 0) {
    const currentDirectory = types.directories.pop();
    const newTypes = reduceToTypesSync(currentDirectory);

    types.directories = types.directories.concat(newTypes.directories);
    types.files = types.files.concat(newTypes.files);
  }

  return types.files;
};
