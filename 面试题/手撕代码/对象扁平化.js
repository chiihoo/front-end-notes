// 对象扁平化

// 说明：请实现 flatten(input) 函数，input 为一个 javascript 对象（Object 或者 Array），返回值为扁平化后的结果。
// 示例：
let input = {
  a: 1,
  b: [1, 2, { c: true }, [3]],
  d: { e: 2, f: 3 },
  g: null,
}
let output = flatten(input)
console.log(output)
//  output如下
let res = {
  a: 1,
  'b[0]': 1,
  'b[1]': 2,
  'b[2].c': true,
  'b[3][0]': 3,
  'd.e': 2,
  'd.f': 3,
  // "g": null,  值为null或者undefined，丢弃
}

function flatten(obj) {
  let res = {}
  function transform(key, obj) {
    if (typeof obj !== 'object') {
      res[key] = obj
      return
    }
    if (obj === null || obj === undefined) {
      return
    }
    if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        transform(`${key}[${i}]`, obj[i])
      }
    } else {
      for (let k in obj) {
        if (obj.hasOwnProperty(k)) {
          transform(`${key}.${k}`, obj[k])
        }
      }
    }
  }

  Object.keys(obj).forEach(key => transform(key, obj[key]))

  return res
}
