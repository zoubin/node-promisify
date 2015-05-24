# node-promisify
Convert callback function to node native promise.

Function name and other own enumberable properties are preserved, as well as the execution context.

Custom promise can be used instead of the native.


## Usage

```javscript
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
var promisify = require('node-promisify');
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
```

output:

```
⌘ node glob.js
other methods: [ 'a.js', 'b.js', 'c.js' ]
original: [ 'a.js', 'b.js', 'c.js' ]
promisish: [ 'a.js', 'b.js', 'c.js' ]
```
