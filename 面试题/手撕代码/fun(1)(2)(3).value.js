// fun(1).value = 1
// fun(1)(2).value = 5
// fun(1)(2)(3).value = 14

function fun(...args1) {
  let value = 0
  // ...args2 第2次及以后的参数
  const f = (...args2) => {
    value = args2.reduce((total, curr) => {
      return total + Math.pow(curr, 2)
    }, value)
    f.value = value
    return f
  }
  // ...args1 第1次的参数
  return f(...args1)
}

console.log(fun(1, 2)(2)(3).value)

// sum(1)(2)(3).sumOf() = 6

function sum(num) {
  let res = 0
  let f = function (arg) {
    res += arg
    f.sumOf = () => {
      return res
    }
    return f
  }
  return f(num)
}
sum(1)(2)(3).sumOf()

// ---------------------------------------------
// add(1)(2) = 3
// add(1, 2) = 3

function add(...args1) {
  let res = 0
  function f(...args2) {
    args2.forEach(item => (res += item))
    return f
  }
  // 重写toString方法，console.log可以在控制台上打出toString的结果
  f.toString = function () {
    return res
  }
  return f(...args1)
}
console.log(add(1)(2)(1, 2))
console.log(add(1, 2))
