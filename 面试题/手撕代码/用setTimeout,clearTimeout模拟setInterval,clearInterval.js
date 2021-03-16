let timer = {}
function _setInterval(func, duration) {
  let key = Symbol()
  function helper() {
    timer[key] = setTimeout(() => {
      func()
      helper()
    }, duration)
  }
  helper()
  return key
}

function _clearInterval(timerId) {
  clearTimeout(timer[timerId])
}

let timerId = _setInterval(() => {
  console.log(timer, Date.now())
}, 1000)
