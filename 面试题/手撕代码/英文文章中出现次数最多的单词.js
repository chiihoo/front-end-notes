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

// let matches = 'abcdads sda sda d, asf. asf'.matchAll(/[a-zA-Z]+/g)
// for (let match of matches) {
//   console.log(match[0])
// }
