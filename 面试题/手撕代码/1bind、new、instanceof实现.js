Function.prototype._bind = function (thisArgs, ...args) {
  let self = this
  return function (...args1) {
    self.call(thisArgs, ...args, ...args1)
  }
}

// ——————————————————————————————————————————————————
function _new(Func, ...args) {
  let obj = {}
  obj.__proto__ = Func.prototype
  Func.call(obj, ...args)
  return obj
}

// ——————————————————————————————————————————————————

function _instanceof(A, B) {
  while (true) {
    if (A.__proto__ === null) {
      return false
    }
    if (A.__proto__ === B.prototype) {
      return true
    }
    A = A.__proto__
  }
}
