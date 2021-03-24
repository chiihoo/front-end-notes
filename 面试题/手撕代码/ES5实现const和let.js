// let

;(function () {
  var a = 5
})()

// console.log(a) // a is not defined

// const
function myConst(key, value) {
  window[key] = value
  Object.defineProperty(window, key, {
    get() {
      return value
    },
    set(newValue) {
      throw new Error('type error')
    }
  })
}
myConst('a', 5)
