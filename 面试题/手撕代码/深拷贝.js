let symbol1 = Symbol('foo')
let obj = {
  a: 'hello',
  b: 1,
  c: true,
  d: [1, 2],
  e: { x: 1, y: 2 },
  f: function () {
    console.log('copytest')
  },
  g: null,
  h: undefined,
  s: symbol1
}

// 方法一：JSON.parse(JSON.stringify(obj))
let copyObj = JSON.parse(JSON.stringify(obj))

// 缺点：1.无法序列化函数，因此上述obj.f无法拷贝
//      2.会忽略undefined和symbol，比如上述obj.h和obj.s都不会被拷贝
//      3.不能解决循环引用的对象

// ————————————————————————————————————————

// 方法二：递归 for in                      <———————————— 用这个版本

// obj是数组或者对象
function deepClone(obj) {
  if (obj === null) return obj
  // if (obj instanceof Date) return new Date(obj)
  // if (obj instanceof RegExp) return new RegExp(obj)
  if (typeof obj !== 'object') return obj // typeof [],{},null === 'object'

  let cloneObj = Array.isArray(obj) ? [] : {}
  // let cloneObj = new obj.constructor() // 找到的是所属类原型上的constructor，而原型上的constructor指向的是当前类本身

  for (let key in obj) {
    // 剥离原型链的数据
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key])
    }
  }
  return cloneObj
}

let copyObj1 = deepClone(obj)

// ————————————————————————————————————————

// 如果用上面那个版本运行底下这个用例的话，会爆栈
let target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: 'child'
  },
  field4: [2, 4, 8]
}
target.target = target // 循环引用

// 改进：解决循环引用的问题                  <———————————— 或者用这个版本
function deepClone1(obj, map = new WeakMap()) {
  if (obj === null) return obj
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof RegExp) return new RegExp(obj)
  if (typeof obj !== 'object') return obj // typeof [],{},null === 'object'

  // 解决循环引用
  if (map.has(obj)) return map.get(obj)
  let cloneObj = Array.isArray(obj) ? [] : {}
  // let cloneObj = new obj.constructor() // 找到的是所属类原型上的constructor，而原型上的constructor指向的是当前类本身
  map.set(obj, cloneObj) // 这个map只能放这，不能放for循环后面

  // 这里用的是for...in...，遍历的是所有可枚举属性，即使是数组，也有自己的属性，而不仅仅是值
  for (let key in obj) {
    // 剥离原型链的数据
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone1(obj[key], map)
    }
  }

  return cloneObj
}

let copyObj1 = deepClone1(target)

// ————————————————————————————————————————
// 两个参数的版本
function deepClone2(obj, copyObj) {
  if (!copyObj) {
    copyObj = Array.isArray(obj) ? [] : {}
  }
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        // []或者{}
        copyObj[key] = Array.isArray(obj[key]) ? [] : {}
        deepClone2(obj[key], copyObj[key])
      } else {
        // 除去[]和{}以外的所有类型
        copyObj[key] = obj[key]
      }
    }
  }

  return copyObj
}

let copyObj2 = deepClone2(obj)
