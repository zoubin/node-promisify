var promisify = require('..');
var glob = promisify(require('glob'));

glob('*.js', { cwd: './files' }).then(function (files) {
    console.log('promisish:', files);
});

// original style
glob('*.js', { cwd: './files' }, function (err, files) {
    console.log('original:', files);
});

// other methods
console.log('other methods:', glob.sync('*.js', { cwd: './files' }));
