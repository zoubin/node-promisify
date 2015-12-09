# node-promisify
[![version](https://img.shields.io/npm/v/node-promisify.svg)](https://www.npmjs.org/package/node-promisify)
[![status](https://travis-ci.org/zoubin/node-promisify.svg?branch=master)](https://travis-ci.org/zoubin/node-promisify)
[![dependencies](https://david-dm.org/zoubin/node-promisify.svg)](https://david-dm.org/zoubin/node-promisify)
[![devDependencies](https://david-dm.org/zoubin/node-promisify/dev-status.svg)](https://david-dm.org/zoubin/node-promisify#info=devDependencies)

Convert a callback-based api to one that returns a promise.

**NOTE**:
* Own properties are preserved. But other inherited properties such as `name`, `length`, `toString`, do not preserve.
* Custom promise can be used instead of the native. But no polyfill is applied when your node version does not support promise.
* Multiple values can be resolved when the `argc` option is specified.


## Example

```javascript
var promisify = require('../')

function async(a, b, c, d, cb) {
  process.nextTick(function () {
    cb(null, a + b, a + b + c, a + b + c + d)
  })
}

async.sync = function (a, b) {
  return a + b
}

var promisified = promisify(async)

console.log('Sync sum:', promisified.sync(1, 2))
promisified(1, 2, 3, 4)
  .then(function (sum) {
    console.log('Async sum:', sum)
  })

promisify(async, 2)(1, 2, 3, 4)
  .then(function (sums) {
    console.log('Two sums:', sums)
  })

promisify(async, -1)(1, 2, 3, 4)
  .then(function (sums) {
    console.log('All sums:', sums)
  })

```

output:

```
⌘ node example/sums.js
Sync sum: 3
Async sum: 3
Two sums: [ 3, 6 ]
All sums: [ 3, 6, 10 ]

```

## pfn = promisify(fn, opts)
Return a new function which returns a promise.

Sugar: `pfn = promisify(fn, argc)`, `pfn = promisify(fn, promise)`

### fn
The async function to be promisified.

Type: `Function`

Signature: `fn(arg1, arg2, ..., done)`

### opts

#### promise
Specify a custom promise constructor.

Type: `Function`

#### argc
Specify the number of values to be resolved.

Type: `Number`

Default: `null`

When specified, the returned promise always resolve to an array.
If not specified, only the first value is resolved.
To resolve all possible values, specify a negative `argc`.

