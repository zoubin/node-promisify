var promisify = require('..');
var glob = promisify(require('glob'), { compatible: true });
var path = require('path');

// promisish style
glob('*.js', { cwd: path.join(__dirname, 'files') }).then(function (files) {
    console.log('promisish:', files);
});

// mixed style
glob('*.js', { cwd: path.join(__dirname, 'files') }, function (err, files) {
    console.log('mixed style: original', files);
}).then(function (files) {
    console.log('mixed style: promisish', files);
});

console.log('other methods:', glob.sync('*.js', { cwd: path.join(__dirname, 'files') }));
