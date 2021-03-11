// 防抖
// 非立即执行版，等待duration后才执行第一次func()
function debounce1(func, duration) {
  let timer = null
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.call(this, ...args)
    }, duration)
  }
}

// 立即执行版，先立即执行一次func()，再接着防抖
// 核心在于timer为null才执行，定时器里面设置timer为null
function debounce2(func, duration) {
  let timer = null
  return function (args) {
    if (timer) {
      clearTimeout(timer)
    } else {
      func.call(this, ...args)
    }
    timer = setTimeout(() => {
      timer = null
    }, duration)
  }
}

// ————————————————————————————————————————————

// 节流
// 时间戳版
function throttle1(func, duration) {
  let prev = 0
  return function (...args) {
    let now = Date.now()
    if (now - prev > duration) {
      func.call(this, ...args)
      prev = now
    }
  }
}

// 定时器版
function throttle2(func, duration) {
  let timer = null
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        func.call(this, ...args)
        timer = null
      }, duration)
    }
  }
}
