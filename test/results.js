var test = require('tap').test
var promisify = require('..')

test('single', function (t) {
  t.plan(1)
  var add = function (a, b, cb) {
    setTimeout(function() {
      cb(null, a + b)
    }, 10)
  }
  add = promisify(add)
  add(1, 2).then(function (res) {
    t.equal(res, 3)
  })
})

test('all', function (t) {
  t.plan(1)
  var add = function (a, b, cb) {
    setTimeout(function() {
      cb(null, a + b, a - b)
    }, 10)
  }
  add = promisify(add, -1)
  add(1, 2).then(function (res) {
    t.same(res, [3, -1])
  })
})

test('multiple', function (t) {
  t.plan(1)
  var add = function (a, b, cb) {
    setTimeout(function() {
      cb(null, a + b, a - b)
    }, 10)
  }
  add = promisify(add, 2)
  add(1, 2).then(function (res) {
    t.same(res, [3, -1])
  })
})

