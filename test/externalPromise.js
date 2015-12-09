var test = require('tap').test
var promisify = require('..')

function $Promise() {}

$Promise.prototype.then = function(cb) {
  setTimeout(function() {
    cb(1)
  }, 10)
}

test('external promise', function (t) {
  t.plan(1)
  var add = function (cb) {
    setTimeout(function() {
      cb(null, 2)
    }, 10)
  }
  add = promisify(add, $Promise)
  add().then(function (res) {
    t.equal(res, 1)
  })
})

