var test = require('tap').test
var promisify = require('..')

test('preserve context', function (t) {
  t.plan(1)
  var ctx = {}
  var add = function (cb) {
    var self = this
    setTimeout(function() {
      cb(null, self)
    }, 10)
  }
  add = promisify(add)
  add.call(ctx).then(function (res) {
    t.same(res, ctx)
  })
})

test('preserve property', function (t) {
  function add(a, b, cb) {
    setTimeout(function() {
      cb(null, a + b)
    }, 10)
  }
  add.sync = function (a, b) {
    return a + b
  }
  var padd = promisify(add)
  t.equal(padd.length, 3, 'fn.length')
  t.equal(padd.name, 'add', 'fn.name')
  t.equal(padd.sync(1, 2), 3)
  t.end()
})

