// function deepFreeze(obj) {
//   for (let key in obj) {
//     if (obj.hasOwnProperty(key)) {
//       if (typeof obj[key] === 'object' && obj[key] !== null) {
//         deepFreeze(obj[key])
//       }
//     }
//   }
//   return Object.freeze(obj)
// }

// 实际需要用Object.getOwnPropertyNames(obj)来获取对象实例的所有属性名字，不管它是可迭代还是不可迭代的
// 而for in和obj.hasOwnProperty(key)只能获取对象实例的可迭代属性

function deepFreeze(obj) {
  const propNames = Object.getOwnPropertyNames(obj)
  propNames.forEach(key => {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      deepFreeze(obj[key])
    }
  })
  return Object.freeze(obj)
}

let obj = {
  internal: {}
}

deepFreeze(obj)
obj.internal.a = 'foo'
obj.internal.a // undefined

// 或者用Proxy代理操作
let proxyObj = new Proxy(
  {},
  {
    get(target, key, receiver) {
      // console.log('get')
      // return Reflect.get(target, key, receiver)
    },
    set(target, key, value) {
      // console.log('set')
      // return Reflect.set(target, key, value)
    }
  }
)
proxyObj.age = 100
