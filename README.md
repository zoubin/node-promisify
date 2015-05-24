# node-promisify
Convert callback function to node native promise.

Function name and other own enumberable properties are preserved, as well as the execution context.

Custom promise can be used instead of the native.


## Usage

```javascript
var promisify = require('node-promisify');
promisify(function async(a, b, c, cb) {
    cb(null, d, e, f);
}).then(function (results) {
    // results is [d, e, f]
});

```

### pfn = promisify(fn, opts)

* fn: *Function* the async function
* opts: *Object*

    * compatible: *Boolean* if `true`, `pfn` can also be used the same as `fn`
    * promise: *Function* Promise constructor to be used instead of the native.

## Example

```javascript
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
```

output:

```
⌘ node example/glob.js
other methods: [ 'a.js', 'b.js', 'c.js' ]
mixed style: original [ 'a.js', 'b.js', 'c.js' ]
promisish: [ 'a.js', 'b.js', 'c.js' ]
mixed style: promisish [ 'a.js', 'b.js', 'c.js' ]
```
