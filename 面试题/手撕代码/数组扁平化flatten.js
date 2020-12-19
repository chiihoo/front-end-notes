// 方法一：ES6中有现成的Array.prototype.flat([depth])方法，除了扁平化，还会移除数组中的空项
// depth：指定要提取嵌套数组的结构深度，默认值为 1
let arr1 = [1, 2, , 3, [1, 2, 3, 4, [2, 3, 4]]]

console.log(arr1.flat(1)) // [1, 2, 3, 1, 2, 3, 4, [2, 3, 4]]

// 方法二                                                 <———————————— 用这个版本
// 递归，结果为一维数组
function flattenDeep1(arr) {
  let res = []
  arr.forEach(item => {
    if (Array.isArray(item)) {
      res = res.concat(flattenDeep1(item))
    } else {
      res.push(item)
    }
  })
  return res
}

console.log(flattenDeep1(arr1))

// 方法二
// 用扩展运算符，每次都要遍历每一项是否有数组，如果有数组就要用扩展运算符削去一层
function flattenDeep2(arr) {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}

console.log(flattenDeep2(arr1))

// 方法三
// 使用toString，这个方法其实是有问题的，比如null和undefined转数字
// parseInt(null) === NaN, parseInt(undefined) === NaN
// Number(null) === 0, Number(undefined) === NaN
// +null === 0, +undefined === NaN
function flattenDeep3(arr) {
  return arr
    .toString() // "1,2,,3,1,2,3,4,2,3,4"   或者join()/join(',')也可以
    .split(',')
    .map(item => parseInt(item))
}

console.log(flattenDeep3(arr1))

// 方法四
// reduce，其实跟方法一差不多
function flattenDeep4(arr) {
  return arr.reduce((res, item) => {
    return res.concat(Array.isArray(item) ? flattenDeep4(item) : item)
  }, [])
}

console.log(flattenDeep4(arr1))

// ————————————————————————————————————————————————————————————————————————————————
// 如果想要可以控制最多减少的嵌套层级数，加个depth就可以了

// 方法一                                                   <———————————— 用这个版本
function flattenDepth(arr, depth = 1) {
  let res = []
  arr.forEach(item => {
    if (Array.isArray(item) && depth > 0) {
      res = res.concat(flattenDepth(item, depth - 1))
    } else {
      res.push(item)
    }
  })
  return res
}

console.log(flattenDepth(arr1, 1))
console.log(flattenDepth(arr1, Infinity))

// 方法二
function flattenDepth1(arr, depth = 1) {
  if (depth > 0) {
    return arr.reduce((res, item) => {
      return res.concat(Array.isArray(item) ? flattenDepth1(item, depth - 1) : item)
    }, [])
  } else {
    return [...arr]
    // return arr.slice()
  }
}

console.log(flattenDepth1(arr1, 1))
console.log(flattenDepth1(arr1, Infinity))
