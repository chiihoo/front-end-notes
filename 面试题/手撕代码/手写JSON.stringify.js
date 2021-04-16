function jsonStringify(obj) {
  let type = typeof obj
  if (type === 'string') {
    return `"${obj}"`
  }
  if (type === 'number' || type === 'boolean' || obj === null) {
    return obj
  }
  if (type === 'undefined' || type === 'function') {
    return undefined
  }

  let str = ''
  if (type === 'object') {
    if (Array.isArray(obj)) {
      str += '['
      for (let i = 0; i < obj.length; i++) {
        let currVal = jsonStringify(obj[i])
        str += currVal === undefined ? null : currVal
        if (i < obj.length - 1) {
          str += ','
        }
      }
      str += ']'
      return str
    } else {
      str += '{'
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          let currVal = jsonStringify(obj[key])
          // 当值为undefined或者function时，应该是不写的
          if (currVal !== undefined) {
            str += `"${key}":${currVal},`
          }
        }
      }
      // 去除最后一个逗号
      if (str !== '{') {
        str = str.slice(0, str.length - 1)
      }
      str += '}'
      return str
    }
  }
}

let obj = {
  a: [7, '8', null, undefined],
  b: { c: [2, 4, true, { d: 8, e: 'xx' }] }
}
console.log(jsonStringify(obj))

console.log(jsonStringify2(obj))

// ————————————————————————————————————————————————————————————————
// 简化版，只考虑number, string, array, object
function jsonStringify2(obj) {
  if (typeof obj === 'string') {
    return `"${obj}"`
  }
  if (typeof obj === 'number') {
    return obj
  }
  if (obj === null) {
    return null
  }
  let res = ''
  if (typeof obj === 'object') {
    if (Array.isArray(obj)) {
      res += '['
      for (let i = 0; i < obj.length; i++) {
        let value = jsonStringify(obj[i])
        res += value
        if (i < obj.length - 1) {
          res += ','
        }
      }
      res += ']'
      return res
    } else {
      res += '{'
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          let value = jsonStringify(obj[key])
          res += `"${key}":${value},`
        }
      }
      if (res !== '{') {
        res = res.slice(0, res.length - 1)
      }
      res += '}'
      return res
    }
  }
}
