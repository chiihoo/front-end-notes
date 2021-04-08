// 请写一个函数，计算一篇英文文章中出现次数最多的单词及出现次数。

// 'abcdads sda d, asf. asf'
function solution(articles) {
  let arr = articles.split(' ')
  for (let i = 0; i < arr.length; i++) {
    let len = arr[i].length
    if (arr[i][len - 1] === ',' || arr[i][len - 1] === '.') {
      arr[i] = arr[i].slice(0, len - 1)
    }
  }

  let map = new Map()
  for (let item of arr) {
    if (map.has(item)) {
      map.set(item, map.get(item) + 1)
    } else {
      map.set(item, 1)
    }
  }

  let max = 1
  let maxKey = []
  for (let [key, value] of map) {
    if (max === value) {
      maxKey.push(key)
    } else if (value > max) {
      maxKey = [key]
      max = value
    }
  }
  return { key: maxKey, times: max }
}

console.log(solution('abcdads sda sda d, asf. asf'))
                     
// 匹配单词的正则/[a-zA-Z]+[\-\'][a-zA-Z]+/g
// what's, fifty-five

// 用match以及全局g直接可以匹配到所有单词，结果是["abcdads", "sda", "sda", "d", "asf", "asf"]
// 用match但没有全局g，结果是["abcdads", index: 0, input: "abcdads sda sda d, asf. asf", groups: undefined]
// let matches = 'abcdads sda sda d, asf. asf'.match(/[a-zA-Z]+/g)
// for (let item of matches) {
//   console.log(item)
// }

// 用matchAll可以匹配到所有单词，结果是个迭代器，需要用for of来获取，每一项跟match不用g是相同的
// let matches = 'abcdads sda sda d, asf. asf'.matchAll(/[a-zA-Z]+/g)
// for (let item of matches) {
//   console.log(item[0])
// }
