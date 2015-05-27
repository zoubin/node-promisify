var mix = require('util-mix').mix;

module.exports = function (fn, opts) {
    if (typeof opts === 'function') {
        opts = { promise: opts };
    }
    opts = mix({
        promise: Promise,
        argc: 1
    }, opts);

    var $promise = opts.promise;
    var argc = +opts.argc || 0;
    var argEnd = argc < 0 ? undefined : argc + 1;

    var promisified = eval(
        '(function ' + fn.name + '(){' +
            'return (' + exec.toString() + ').call(this,arguments);' +
        '})'
    );

    // enumerable own property
    mix(promisified, fn);

    return promisified;

    function exec(args) {
        var ctx = this;
        args = arrayify(args);
        return new $promise(function (resolve, reject) {
            fn.apply(ctx, args.concat(function (err, res) {
                if (err) return reject(err);
                if (argc === 1) {
                    return resolve(res);
                }
                resolve(arrayify(arguments, 1, argEnd));
            }));
        });
    };
};

function arrayify(o, from, to) {
    return Array.prototype.slice.call(o, from, to);
}
