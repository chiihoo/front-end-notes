Array.prototype.myMap = function (fn, thisArg = window) {
  let res = []
  for (let i = 0; i < this.length; i++) {
    res.push(fn.call(thisArg, this[i], i, this))
  }
  return res
}

Array.prototype.reduce = function (fn, initialValue) {
  if (initialValue) {
    let total = initialValue
    for (let i = 0; i < this.length; i++) {
      total = fn(total, this[i], i, this)
    }
  } else {
    let total = this[0]
    for (let i = 1; i < this.length; i++) {
      total = fn(total, this[i], i, this)
    }
  }
  return total
}
