let obj1 = {
  a: {
    c: 5,
    b: [2, 3, 4],
    x: 8
  },
  d() {
    console.log(5)
  },
  c: 6
}

let obj2 = {
  a: {
    c: 5,
    b: [5]
  },
  d: 5
}
// 把obj2合并到obj1上，
// 不同类型直接替换，对象就递归，数组就合并
function merge(obj1, obj2) {
  for (let key in obj2) {
    if (Object.prototype.toString(obj1[key]) !== Object.prototype.toString(obj2[key])) {
      obj1[key] = obj2[key]
    } else if (typeof obj2[key] !== 'object' || obj2[key] === null) {
      // 除了数组和对象
      obj1[key] = obj2[key]
    } else if (Array.isArray(obj2[key])) {
      obj1[key] = [...obj1[key], ...obj2[key]]
    } else {
      obj1[key] = merge(obj1[key], obj2[key])
    }
  }
  return obj1
}
console.log(merge(obj1, obj2))
