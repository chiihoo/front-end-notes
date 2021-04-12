function addProxy(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      return Reflect.set(target, key, value, receiver)
    },
  })
}

function myProxy(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      obj[key] = myProxy(obj[key])
    }
  }
  return addProxy(obj)
}

let obj = {
  city: '北京',
  area: ['海淀区', '石景山区', '门头沟区'],
  children: {
    test1: {
      name: '北',
      area: ['sss', 'bbb'],
    },
  },
}
Object.keys(obj).forEach(item => console.log(item))

let x = myProxy(obj)
console.log(x)
