var mix = require('mixy')

module.exports = function (fn, opts) {
  if (typeof opts === 'function') {
    opts = { promise: opts }
  } else if (typeof opts === 'number') {
    opts = { argc: opts }
  }
  opts = opts || {}

  var $promise = opts.promise || Promise
  var argc = opts.argc == null ? null : ~~opts.argc
  var argEnd
  if (argc >= 0) {
    argEnd = argc + 1
  }

  var argStr = (new Array(fn.length))
    .join(',').split(',')
    .map(function (v, i) {
      return 'arg' + i
    }).join(',')

  // Preserve `fn.name` and `fn.length`
  var promisified = eval([
    '(function', fn.name, '(', argStr, '){',
    'return (', exec.toString(), ').call(this,arguments)',
    '})',
  ].join(' '))

  // Preserve properties (not including `fn.name`, `fn.length`)
  mix(promisified, fn)

  function exec(args) {
    var ctx = this
    args = slice(args)
    return new $promise(function (resolve, reject) {
      fn.apply(ctx, args.concat(function (err, res) {
        if (err) {
          return reject(err)
        }
        if (argc == null) {
          return resolve(res)
        }
        resolve(slice(arguments, 1, argEnd))
      }))
    })
  }

  return promisified
}

function slice(o, from, to) {
  return Array.prototype.slice.call(o, from, to)
}

