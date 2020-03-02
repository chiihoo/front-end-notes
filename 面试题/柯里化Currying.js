function trueCurrying(fn, ...args) {
  if (args.length >= fn.length) {
    return fn(...args)
  }
  return function(...args2) {
    return trueCurrying(fn, ...args, ...args2)
  }
}
