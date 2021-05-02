function trueCurrying(fn, ...args) {
  if (args.length >= fn.length) {
    return fn(...args)
  }
  return function (...args2) {
    return trueCurrying(fn, ...args, ...args2)
  }
}

// 纯函数就是没有副作用，相同的输入肯定有相同的输出
// 而函数柯里化会返回一个函数，可以链式的进行调用
