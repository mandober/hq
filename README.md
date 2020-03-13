# Currying variants

* name: js-flex
* repo: https://github.com/mandober/js-flex

Flex (alternative spelling: *Schönfinkeling*) is a decorator for polyadic functions that allows more relaxed supply of arguments.

It is related to currying and may be considered its more relaxed version. Currying is strict regarding the way arguments are supplied to an `n`-ary function when it is decorated in `curry`: the args are required to be passed one by one, i.e. as `n` 1-tuples (one arg per each call to the decorated function):

```js
// quaternary function
const q = (a, b, c, d) => a + b + c + d;

// first, decorate it in curry
const curried = curry(q);

// then, supply args one by one (totalling to 4 one-tuples)
curried(3)(5)(7)(9);
```

Flex is similar, but it grants complete freedom in how the arguments are supplied, allowing arguments as a number of `n`-tuples. Flex will keep collecting until `q.length` number of arguments are collected, at which time it will invoke the wrapped function `q`. In case more arguments then `q.length` are collected, the extra ones are ignored.

An `n`-ary function `q`, after being decorated in `flex`, may receive its arguments as a combination of `k`-tuples (where `1 <= k <= n`).

```js
// quaternary function
const q = (a, b, c, d) => a + b + c + d;

// flex-decorate it
const flexed = flex(q);

// then pass args anyhow:
flexed(3)(5)(7)(9)  // 4 x 1-tuple (same as curry)
flexed(3, 5, 7)(9)
flexed(3)(5, 7)(9)
flexed(3, 5)(7, 9)
flexed(3)(5)(7, 9)
flexed(3)(5, 7, 9)
flexed(3, 5, 7)(9)
flexed(3, 5, 7, 9)  // 1 x 4-tuple (same as uncurry)
```

In other words, decorate a function in `flex` and pass it the arguments grouped in any which way. You can also supply any number of arguments in the initial call to flex (even all, defeating the purpose).

```js
// Normally, you'd first pass a function alone in the wrapping call...
const flexed = flex(q);
// ...then, supply the args later
flexed(3,5)(7,9);

// However, you may supply args in the wrapping call as well
const flexed = flex(q, 3, 5);
// give others later
flexed(7)(9);

// You could even pass in all the args (futile but possible)
const flexed = flex(q, 3, 5, 7, 9);
```
