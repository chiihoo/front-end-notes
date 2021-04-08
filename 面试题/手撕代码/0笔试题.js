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
  '第1题:',
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
console.log('第2题:', solution2(['a', 'ab', 'abc', 'b', 'abc', 'ab']))

// ——————————————————————————————————————————————————————————————————————————————————————————
// 3. 给定数组 ['1a','2b','13c','5a'] ，输出出现次数最多的字母前数字之和 (输出6)

function solution3(arr) {
  let map = new Map()
  for (let item of arr) {
    let matchArr = item.match(/([0-9]+)([a-zA-Z]+)/)
    if (matchArr !== null) {
      let num = matchArr[1]
      let str = matchArr[2]
      if (map.has(str)) {
        let x = map.get(str)
        map.set(str, [x[0] + 1, x[1] + Number(num)])
      } else {
        map.set(str, [1, +num])
      }
    }
  }
  let res = []
  let maxCount = 0
  for (let [key, [count, sum]] of map) {
    if (count === maxCount) {
      res.push({ maxKey: key, maxSum: sum })
    } else if (count > maxCount) {
      res = [{ maxKey: key, maxSum: sum }]
      maxCount = count
    }
  }
  return res
}
console.log('第3题:', solution3(['1a', '2b', '13c', '5a', '7c']))

// ——————————————————————————————————————————————————————————————————————————————————————————
// 4.输入：
// old: ['a', 'b', 'c']
// new: ['t', 'b', 'a', 'x']
// 输出：
// a move index 2
// c remove
// t append index 0
// x append index 3

function solution4(oldArr, newArr) {
  let res = []
  for (let i = 0; i < oldArr.length; i++) {
    let index = newArr.indexOf(oldArr[i])
    if (index === -1) {
      res.push(`${oldArr[i]} remove`)
    } else if (i !== index) {
      res.push(`${oldArr[i]} move index ${index}`)
    }
  }
  for (let i = 0; i < newArr.length; i++) {
    if (!oldArr.includes(newArr[i])) {
      res.push(`${newArr[i]} append index ${i}`)
    }
  }
  return res
}
console.log('第4题:', solution4(['a', 'b', 'c'], ['t', 'b', 'a', 'x']))

// ——————————————————————————————————————————————————————————————————————————————————————————
// 5.实现diff (oldData, newData){}，复杂度 O(n)
function solution5(oldData, newData) {}
// console.log('第5题:', solution5(['a', 'b', 'c'], ['t', 'b', 'a', 'x']))

// 6.假定数组 M 中每个元素都代表一个模块，其结构为 { id: 1, deps: [ 2, 3 ] }，id 即模块的唯一标识，deps 包含该模块所依赖模块的 id。要求对 M 进行排序，结果中任何元素都出现在它的依赖模块之后。
// 输入：
// [ { id: 4, deps: [1] }, { id: 3, deps: [2] }, { id: 2, deps:[] }, { id: 1, deps: [2, 3]} ]
// 输出：
// [ { id: 2, deps:[] }, { id: 3, deps: [2] }, { id: 1, deps: [2, 3]}, { id: 4, deps: [1] }]
function solution6(arr) {}

// ——————————————————————————————————————————————————————————————————————————————————————————
// 7.格式转换
// let data = [
//   { id: 10, parentId: 0, text: '一级菜单-1' },
//   { id: 20, parentId: 0, text: '一级菜单-2' },
//   { id: 30, parentId: 20, text: '二级菜单-3' },
//   { id: 25, parentId: 30, text: '三级菜单-25' },
//   { id: 35, parentId: 30, text: '三级菜单-35' }
// ]

// let result = [
//   {
//     id: 10,
//     text: '一级菜单-1',
//     parentId: 0
//   },
//   {
//     id: 20,
//     text: '一级菜单-2',
//     parentId: 0,
//     children: [
//       {
//         id: 30,
//         text: '一级菜单-3',
//         parentId: 20,
//         children: [
//           {
//             id: 25,
//             text: '一级菜单-25',
//             parentId: 30,
//             children: []
//           },
//           {
//             id: 35,
//             text: '一级菜单-35',
//             parentId: 30,
//             children: []
//           }
//         ]
//       }
//     ]
//   }
// ]

let data = [
  { id: 10, parentId: 0, text: '一级菜单-1' },
  { id: 20, parentId: 0, text: '一级菜单-2' },
  { id: 30, parentId: 20, text: '二级菜单-3' },
  { id: 25, parentId: 30, text: '三级菜单-25' },
  { id: 35, parentId: 30, text: '三级菜单-35' }
]

function solution7(arr) {
  let map = {}
  // id -> 对象
  for (let item of arr) {
    map[item.id] = item
  }

  let res = []
  for (let item of arr) {
    // 这些放进res的item呀、map中的对象啊，都是用的引用地址，实际修改的还是同一个对象
    if (item.parentId === 0) {
      res.push(item)
      continue
    }
    let parent = map[item.parentId]
    if (!parent.children) {
      parent.children = []
    }
    parent.children.push(item)
  }
  return res
}

console.log('第7题:', solution7(data))
