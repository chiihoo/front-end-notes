// 题目
// 将以下的entry对象转换成output对象的形式
// let entry = {
//   'a.b.c.dd': 'value',
//   'a.d.xx': 'val',
//   'a.e': 'v'
// }
// let output = {
//   a: {
//     b: {
//       c: {
//         dd: 'value'
//       }
//     },
//     d: {
//       xx: 'val'
//     },
//     e: 'v'
//   }
// }

// ——————————————————————————————————————————————————————

let entry = {
  'a.b.c.dd': 'value',
  'a.d.xx': 'val',
  'a.e': 'v'
}

function parseEntry(entry) {
  // 这里每次把keyArray分为第一个key和后面的rest，之后下一次递归时，排除掉了第一个key
  // 相当于transform(res, [...keyArray], value)，keyArray[0], keyArray.slice(1)
  function transform(target, [key, ...rest], value) {
    console.log('key:', key)
    if (rest.length === 0) {
      target[key] = value
      return
    }
    if (!target[key]) {
      target[key] = {}
    }
    transform(target[key], rest, value)
  }

  let res = {}
  Object.keys(entry).forEach(key => {
    transform(res, key.split('.'), entry[key])
  })
  return res
}

console.log('output:', parseEntry(entry))

// ——————————————————————————————————————————————————————
// function subDecode(obj, key, value) {
//   const arr = key.split('.')
//   const head = arr[0]
//   if (arr.length === 1) {
//     obj[head] = value
//     return
//   }
//   if (!(head in obj)) {
//     obj[head] = {}
//   }
//   subDecode(obj[head], key.slice(2), value)
// }
// function decode(obj) {
//   const res = {}
//   const keyArr = Object.keys(obj)
//   const valueArr = Object.values(obj)
//   const length = keyArr.length
//   for (let i = 0; i < length; i++) {
//     subDecode(res, keyArr[i], valueArr[i])
//   }
//   return res
// }

// let entry = {
//   'a.b.c.dd': 'value',
//   'a.d.xx': 'val',
//   'a.e': 'v'
// }
// console.log(decode(entry))

// ——————————————————————————————————————————————————————
// 超级简写
// const set = (target, [key, ...rest], value) =>
//   rest.length
//     ? set(target[key] || (target[key] = {}), rest, value) && target
//     : (target[key] = value)
// const parseEntry = entry =>
//   Object.keys(entry).reduce((res, path) => set(res, path.split('.'), entry[path]), {})

// let entry = {
//   'a.b.c.dd': 'value',
//   'a.d.xx': 'val',
//   'a.e': 'v'
// }

// console.log(parseEntry(entry))
