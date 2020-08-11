const obj = {}

const $on = (name, fn) => {
  if (!obj[name]) {
    obj[name] = []
  }
  obj[name].push(fn)
}

const $emit = (name, val) => {
  if (obj[name]) {
    obj[name].forEach(fn => fn(val))
  }
}

const $off = (name, fn) => {
  if (!obj[name]) {
    return
  }
  if (fn) {
    const index = obj[name].indexOf(fn)
    if (index !== -1) {
      obj[name].splice(index, 1)
    }
  } else {
    obj[name].length = 0
  }
}

export default {
  $on,
  $emit,
  $off
}
