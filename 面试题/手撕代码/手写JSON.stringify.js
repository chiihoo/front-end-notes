function jsonStringify(obj) {
  let type = typeof obj
  if (type === 'string') {
    return `"${obj}"`
  }
  if (type === 'number' || type === 'boolean') {
    return String(obj)
  }
  if (type === 'undefined' || type === 'function') {
    return undefined
  }

  let str = ''
  if (type === 'object') {
    if (Array.isArray(obj)) {
      str += '['
      for (let i = 0; i < obj.length; i++) {
        let currVal = jsonStringify(item)
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
            str += `"${key}": "${currVal}",`
          }
        }
      }
      // 去除最后一个逗号
      if (str[str.length - 1] !== '{') {
        str = str.slice(0, str.length - 1)
      }
      str += '}'
      return str
    }
  }
}
