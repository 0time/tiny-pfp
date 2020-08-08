const { bluebird, d, expect, path, tquire } = deps;

const me = path.relative(process.cwd(), __filename);

d(me, () => {
  const promiseProps = tquire(me);

  const promiseProp = Symbol();
  const valueProp = Symbol();

  it('should resolve with the resolved values', () =>
    promiseProps({
      promiseProp: (function promiseToResolvePromiseProp() {
        return Promise.resolve(promiseProp);
      })(),
      valueProp,
    }).then(result =>
      expect(result).to.deep.equal({ promiseProp, valueProp }),
    ));

  it('should resolve with the resolved values with an alternate promise lib', () =>
    promiseProps
      .usingPromise(bluebird)({
        promiseProp: (function promiseToResolvePromiseProp() {
          return Promise.resolve(promiseProp);
        })(),
        valueProp,
      })
      .then(result =>
        expect(result).to.deep.equal({ promiseProp, valueProp }),
      ));
});
