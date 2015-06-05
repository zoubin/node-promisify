var test = require('tape');
var promisify = require('..');

test('promisify: single result as arguments', function (t) {
    t.plan(1);
    var add = function (a, b, cb) {
        setTimeout(function() {
            cb(null, a + b);
        }, 10);
    };
    add = promisify(add);
    add(1, 2).then(function (res) {
        t.equal(res, 3);
    });
});

test('promisify: all results as arguments', function (t) {
    t.plan(1);
    var add = function (a, b, cb) {
        setTimeout(function() {
            cb(null, a + b, a - b);
        }, 10);
    };
    add = promisify(add, -1);
    add(1, 2).then(function (res) {
        t.same(res, [3, -1]);
    });
});

test('promisify: multiple results as arguments', function (t) {
    t.plan(1);
    var add = function (a, b, cb) {
        setTimeout(function() {
            cb(null, a + b, a - b);
        }, 10);
    };
    add = promisify(add, 2);
    add(1, 2).then(function (res) {
        t.same(res, [3, -1]);
    });
});

test('promisify: error', function (t) {
    t.plan(2);
    var err = new Error('promisify');
    var divide = function (a, b, cb) {
        setTimeout(function() {
            cb(err);
        }, 10);
    };
    divide = promisify(divide);
    divide(0, 0).catch(function (e) {
        t.equal(!!e, true);
        t.same(e, err);
    });
});

