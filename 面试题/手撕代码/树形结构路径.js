function solution(data, target) {
  let res = []
  let track = []
  function dfs(data, target) {
    for (let item of data) {
      track.push(item.value)
      if (item.value === target) {
        res.push([...track])
        return
      }
      if (item.children && item.children.length > 0) {
        dfs(item.children, target)
      }
      track.pop()
    }
  }
  dfs(data, target)
  return res[0]
}

// 这种写法不行，在遍历完data[0]后，就直接返回了
// function solution2(data, target) {
//   let track = []
//   function dfs(data, target) {
//     for (let item of data) {
//       track.push(item.value)
//       if (item.value === target) {
//         return [...track]
//       }
//       if (item.children && item.children.length > 0) {
//         return dfs(item.children, target)
//       }
//       track.pop()
//     }
//   }
//   return dfs(data, target)
// }

function solution2(data, target) {
  let track = []
  function dfs(data, target) {
    for (let item of data) {
      track.push(item.value)
      if (item.value === target) {
        return [...track]
      }
      if (item.children && item.children.length > 0) {
        let res = dfs(item.children, target)
        if (res !== null) {
          return res
        }
      }
      track.pop()
    }
    return null
  }
  return dfs(data, target)
}

// ——————————————————————————————————————————————————————————
let data = [
  {
    value: 1,
    children: [
      {
        value: 6,
        children: [
          {
            value: 7,
            children: null
          }
        ]
      }
    ]
  },
  {
    value: 2,
    children: [
      {
        value: 3,
        children: [
          {
            value: 4,
            children: []
          },
          {
            value: 5,
            children: []
          }
        ]
      }
    ]
  }
]

console.log(solution(data, 7))
console.log(solution(data, 5))
console.log('----------------------------')
// console.log(solution2(data, 7))
console.log(solution2(data, 5))
