var test = require('tap').test
var promisify = require('..')

test('error', function (t) {
  t.plan(1)
  var err = new Error('promisify')
  var divide = function (a, b, cb) {
    setTimeout(function() {
      cb(err)
    }, 10)
  }
  divide = promisify(divide)
  divide(0, 0).catch(function (e) {
    t.same(e, err)
  })
})

