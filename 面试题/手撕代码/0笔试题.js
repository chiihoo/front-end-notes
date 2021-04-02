// 1. 实现[['a', 'b'], ['n', 'm'], ['0', '1']] => ["an0", "an1", "am0", "am1", "bn0", "bn1", "bm0", "bm1"]

// let x = [
//   ['a', 'b'],
//   ['n', 'm'],
//   ['0', '1']
// ].reduce((prev, cur) => {
//   let list = []
//   console.log('xxx', prev, cur)
//   for (let i = 0; i < prev.length; i++) {
//     for (let j = 0; j < cur.length; j++) {
//       list.push(prev[i] + cur[j])
//     }
//   }
//   return list
// })
// console.log(x)

function merge(arr1, arr2) {
  let res = []
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      res.push(arr1[i] + arr2[j])
    }
  }
  return res
}
const solution1 = function (arr) {
  let res = arr[0]
  for (let i = 1; i < arr.length; i++) {
    res = merge(res, arr[i])
  }
  return res
}
// 第一次是[ 'an', 'am', 'bn', 'bm' ]
// 第二次是['an0', 'an1', 'am0', 'am1', 'bn0', 'bn1', 'bm0', 'bm1']
console.log(
  solution1([
    ['a', 'b'],
    ['n', 'm'],
    ['0', '1']
  ])
)

// ——————————————————————————————————————————————————————————————————————————————————————————
// 2. 一个有重复字符串的数组，要求给按照字符串出现的先后顺序给数组中每个字符串加上序号，只出现一次的不用加
// ['a', 'ab', 'abc', 'b', 'abc', 'ab'] => ['a', 'ab1', 'abc1', 'b', 'abc2', 'ab2']
function solution2(arr) {
  let map = new Map()
  for (let i = 0; i < arr.length; i++) {
    if (map.has(arr[i])) {
      map.set(arr[i], [...map.get(arr[i]), i])
    } else {
      map.set(arr[i], [i])
    }
  }
  // Map { 'a' => [ 0 ], 'ab' => [ 1, 5 ], 'abc' => [ 2, 4 ], 'b' => [ 3 ] } 数组中为该字符串每次出现的下标
  // 遍历map，再遍历value数组，value[i]即为key每次出现的下标，就可以直接给数组特定位置赋值了
  let res = []
  for (let [key, value] of map) {
    if (value.length === 1) {
      res[value[0]] = key
    } else {
      for (let i = 0; i < value.length; i++) {
        res[value[i]] = key + (i + 1)
      }
    }
  }
  return res
}
console.log(solution2(['a', 'ab', 'abc', 'b', 'abc', 'ab']))
