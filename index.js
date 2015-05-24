var mix = require('util-mix').mix;

module.exports = function (fn, opts) {
    opts = opts || {};
    if (typeof opts === 'function') {
        opts = { promise: opts };
    }
    var $promise = opts.promise || Promise;

    var promisified = eval(
        '(function ' + fn.name + '(){' +
            'return (' + executable.toString() + ').call(this,arguments);' +
        '})'
    );

    // enumerable own property
    mix(promisified, fn);

    return promisified;

    function executable(args) {
        args = arrayify(args);
        var ctx = this;
        if (opts.compatible && typeof args[args.length - 1] === 'function') {
            return fn.apply(ctx, args);
        }
        return new $promise(function (resolve, reject) {
            fn.apply(ctx, args.concat(function (err, res) {
                if (err) {
                    return reject(err);
                }
                if (arguments.length < 3) {
                    return resolve(res);
                }
                resolve(arrayify(arguments, 1));
            }));
        });
    };
};

function arrayify(o, from, to) {
    return Array.prototype.slice.call(o, from, to);
}
