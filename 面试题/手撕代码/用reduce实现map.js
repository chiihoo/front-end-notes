Array.prototype.myMap = function (fn) {
  return this.reduce((total, item, index, arr) => {
    return [...total, fn(item, index, arr)]
  }, [])
}
console.log([1, 2, 3].myMap((item, index) => item * 2))
