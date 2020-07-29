let arr = [1, 1, 2, 3, 2, 4, 5, 6, 5, 7]

// 方法一
let res = [...new Set(arr)]

let res1 = Array.from(new Set(arr))

// 方法二
let arr = [1, 1, 2, 3, 2, 4, 5, 6, 5, 7]
// 在原始数组中的第一个索引===当前索引值时，才返回当前元素
let res2 = arr.filter((item, index, array) => {
  return array.indexOf(item) === index
})
