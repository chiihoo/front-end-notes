// https://blog.csdn.net/weixin_34202952/article/details/89010989

// -----Proxy-----
// var person = { name: '' }
// var personCopy = new Proxy(person, {
//   get(target, key, receiver) {
//     console.log('get方法被拦截。。。')
//     return Reflect.get(target, key, receiver)
//   },
//   set(target, key, value, receiver) {
//     console.log('set方法被拦截。。。')
//     return Reflect.set(target, key, value, receiver)
//   }
// })
// person.name = 'arvin' // 未有拦截日志打出
// personCopy.name = 'arvin' // set方法被拦截。。。
// console.log(person.name) // 未有拦截日志打出
// console.log(personCopy.name) // get方法被拦截。。。

/**浅拷贝工具方法**/
function clone(myObj) {
  if (typeof myObj != 'object' || myObj == null) return myObj
  var newObj = new Object()
  for (var i in myObj) {
    newObj[i] = clone(myObj[i])
  }
  return newObj
}

function ProxyCopy(target, handle) {
  var targetCopy = clone(target)
  Object.keys(targetCopy).forEach(function (key) {
    Object.defineProperty(targetCopy, key, {
      get: function () {
        return handle.get && handle.get(target, key)
      },
      set: function (newVal) {
        handle.set && handle.set()
        target[key] = newVal
      }
    })
  })
  return targetCopy
}

var person = { name: '' }
var personCopy = new ProxyCopy(person, {
  get(target, key) {
    console.log('get方法被拦截。。。')
    return target[key]
  },
  set(target, key, value) {
    console.log('set方法被拦截。。。')
    // return true;
  }
})
person.name = 'arvin' // 未有拦截日志打出
personCopy.name = 'arvin' // set方法被拦截。。。
console.log(person.name) // 未有拦截日志打出
