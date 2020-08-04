[![Build Status](https://travis-ci.org/0time/tiny-pfp.svg?branch=master)](https://travis-ci.org/0time/tiny-pfp)
[![Coverage Status](https://coveralls.io/repos/github/0time/tiny-pfp/badge.svg?branch=master)](https://coveralls.io/github/0time/tiny-pfp?branch=master)

# tiny-pfp

A lightweight alternative to lodash.

## Functional Programming

    const {fp} = require('@0ti.me/tiny-pfp');

    const mapReduce = (mapFn, reduceFn, initialAccumulator) =>
      flow([fp.map(mapFn), fp.reduce(reduceFn, initialAccumulator)]);

    const data = [1, 2, 3];

    const result = mapReduce(each => 3 * each, (acc, each) => acc + each, 0)(data);

    console.error(result); // Outputs the sum of 3x each item in data: 18
