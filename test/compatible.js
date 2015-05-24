var test = require('tape');
var promisify = require('..');

test('compatible', function (t) {
    t.plan(2);
    function add(a, b, cb) {
        setTimeout(function() {
            cb(null, a + b);
        }, 10);
    };
    var padd = promisify(add, { compatible: true });
    padd(1, 2, function (err, res) {
        t.equal(res, 3);
    }).then(function (res) {
        t.equal(res, 3);
    });
});

