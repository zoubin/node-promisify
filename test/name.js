var test = require('tape');
var promisify = require('..');

test('name: empty', function (t) {
    var ori = function () {};
    var pro = promisify(ori);
    t.equal(pro.name, ori.name);
    t.end();
});

test('name: nonempty', function (t) {
    function ori() {};
    var pro = promisify(ori);
    t.equal(pro.name, ori.name);
    t.end();
});
