var test = require('tape');
var promisify = require('..');

test('external promise', function (t) {
    t.plan(1);
    var add = function (cb) {
        setTimeout(function() {
            cb(null, 2);
        }, 10);
    };
    add = promisify(add, { promise: $Promise });
    add().then(function (res) {
        t.equal(res, 1);
    });
});

function $Promise() {}

$Promise.prototype.then = function(cb) {
    setTimeout(function() {
        cb(1);
    }, 10);
};
