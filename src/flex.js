'use strict';

const flex = (f, ...acc) =>
    f.length <= acc.length
        ? f(...acc)
        : (...args) =>
            f.length <= [...acc, ...args].length
                ? f(...acc, ...args)
                : flex(f, ...acc, ...args)
;

export default flex;
