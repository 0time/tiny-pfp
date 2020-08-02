const { d, expect, tquire } = deps;

const me = __filename;

d(me, () => {
  describe('given a normal require', () => {
    const promisifyCreator = tquire(me)();

    describe('and a function which expects a callback as a last argument and not error', () => {
      const fn = (...args) => {
        const cb = args[args.length - 1];
        const subArray = args.slice(0, args.length - 1);

        setTimeout(() => cb(null, subArray), 0);
      };

      it('should promisify it', () => {
        const a = Symbol();
        const b = Symbol();

        return promisifyCreator(fn)(a, b).then(args =>
          expect(args).to.deep.equal([a, b]),
        );
      });
    });

    describe('and a function which expects a callback as a last argument and error', () => {
      const fn = (...args) => {
        const cb = args[args.length - 1];
        const subArray = args.slice(0, args.length - 1);

        setTimeout(() => cb(subArray, null), 0);
      };

      it('should promisify it', () => {
        const a = Symbol();
        const b = Symbol();

        return promisifyCreator(fn)(a, b).catch(args =>
          expect(args).to.deep.equal([a, b]),
        );
      });
    });
  });
});
