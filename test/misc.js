var test = require('tape');
var promisify = require('..');

test('context', function (t) {
    t.plan(1);
    var ctx = {};
    var add = function (cb) {
        var self = this;
        setTimeout(function() {
            cb(null, self);
        }, 10);
    };
    add = promisify(add);
    add.call(ctx).then(function (res) {
        t.same(res, ctx);
    });
});

test('preserve property', function (t) {
    function add(a, b, cb) {
        setTimeout(function() {
            cb(null, a + b);
        }, 10);
    };
    add.sync = function (a, b) {
        return a + b;
    };
    var padd = promisify(add);
    t.equal(padd.sync(1, 2), 3);
    t.end();
});

test('preserve original', function (t) {
    function ori() {}
    var f = ori;
    var pro = promisify(ori);
    t.equal(f.toString(), ori.toString());
    t.end();
});

test('compatible', function (t) {
    t.plan(1);
    function add(a, b, cb) {
        setTimeout(function() {
            cb(null, a + b);
        }, 10);
    };
    var padd = promisify(add, { compatible: true });
    padd(1, 2, function (err, res) {
        t.equal(res, 3);
    });
});
