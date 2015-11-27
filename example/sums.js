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

