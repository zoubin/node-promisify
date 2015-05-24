var promisify = require('..');
var glob = promisify(require('glob'));
var path = require('path');

glob('*.js', { cwd: path.join(__dirname, 'files') })
    .then(function (files) {
        console.log('promisish style:', files);
    });

glob('*.js', { cwd: path.join(__dirname, 'files') }, function (err, files) {
    console.log('original style:', files);
});

console.log('other methods:', glob.sync('*.js', { cwd: path.join(__dirname, 'files') }));
