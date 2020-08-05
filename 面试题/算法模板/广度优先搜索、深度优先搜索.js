// 树
// 树的BFS 111题
var minDepth = function (root) {
  let res = 0
  if (!root) {
    return res
  }
  let queue = []
  queue.push(root)
  // 有时候也需要用visited的Set来存储，Set和Map差不多，都是用值来存储的，查找值很快，不需要遍历
  while (queue.length > 0) {
    res++
    // 这里的循环可以保证 每层遍历完毕之后，有满足条件的，才返回res
    // 但是不用循环也还是按照层遍历，但是这题由于res需要每层遍历完毕才+1，所以需要循环
    let len = queue.length
    while (len--) {
      let node = queue.shift() //  <---------- 重要的一行
      if (!node.left && !node.right) {
        return res
      }
      if (node.left) {
        queue.push(node.left)
      }
      if (node.right) {
        queue.push(node.right)
      }
    }
  }
}

// 图
let graph = {
  A: ['B', 'C'],
  B: ['A', 'C', 'D'],
  C: ['A', 'B', 'D', 'E'],
  D: ['B', 'C', 'E', 'F'],
  E: ['C', 'D'],
  F: ['D']
}

// BFS广度优先搜索用的是queue，先进先出
// DFS深度优先搜索用的是stack，后进先出

// ['A'] 添加起始点
// ['B', 'C'] 将最前面的'A'去掉，并从后面添加'A'对应的邻接点'B'，'C'
// ['C', 'D'] 将最前面的'B'去掉，并从后面添加'B'对应的邻接点'A'，'C'，'D'，由于'A'，'C'重复，故只添加'D'
// ['D', 'E'] 将最前面的'C'去掉，并从后面添加'C'对应的邻接点'A'，'B'，'D'，'E'，由于'A'，'B'，'D'重复，故只添加'E'
// ['E', 'F'] 将最前面的'D'去掉，并从后面添加'D'对应的邻接点'B'，'C'，'E'，'F'，由于'B'，'C'，'E'重复，故只添加'F'
// ['F'] 将最前面的'E'去掉，并从后面添加'E'对应的邻接点'C'，'D'，由于'C'，'D'重复，故不添加
// [] 将最前面的'F'去掉，并从后面添加'F'对应的邻接点'D'，由于'D'重复，故不添加
// 结果为每次数组的第一个数

// 这个就是找最短路径的过程，每次都要找没有被访问过的节点
// A

// A->B
// A->C

// A->B->D
// A->C->E

// A->B->D->F
// A->C->E

function BFS(graph, start) {
  // start 起始点 比如为 'A'
  // let res = []
  let queue = []
  let visited = new Set()
  queue.push(start)
  visited.add(start)
  let parents = { [start]: null }
  while (queue.length > 0) {
    vertex = queue.shift()
    // res.push(vertex)
    // 遍历 键vertex对应的值['B', 'C']之类的
    for (node of graph[vertex]) {
      if (!visited.has(node)) {
        queue.push(node)
        visited.add(node)
        parents[node] = vertex
      }
    }
    console.log(vertex)
  }
  // return res // ['A', 'B', 'C', 'D', 'E', 'F']，这个是键的按层的遍历顺序
  return parents // 这个是到达点与出发点的映射，可以求最短路径
}

let parents = BFS(graph, 'A') // { A: null, B: 'A', C: 'A', D: 'B', E: 'C', F: 'D' }
// 就可以找出起始点A到任意点的最短路径了
let target = 'E'
let res = []
while (target !== null) {
  res.unshift(target)
  target = parents[target]
}
console.log(res)

// BFS广度优先搜索用的是queue，先进先出
// DFS深度优先搜索用的是stack，后进先出

// ['A'] 添加起始点
// ['B', 'C'] 将最后面的'A'去掉，并从后面添加'A'对应的邻接点'B'，'C'
// ['B', 'D', 'E'] 将最后面的'C'去掉，并从后面添加'C'对应的邻接点'A'，'B'，'D'，'E'，由于'A'，'B'重复，故只添加'D'，'E'
// ['B','D'] 将最后面的'E'去掉，并从后面添加'E'对应的邻接点'C'，'D'，由于'C'，'D'重复，故不添加
// ['B', 'F'] 将最后面的'D'去掉，并从后面添加'D'对应的邻接点'B'，'C'，'E'，'F'，由于'B'，'C'，'E'重复，故只添加'F'
// ['B'] 将最后面的'F'去掉，并从后面添加'F'对应的邻接点'D'，由于'D'重复，故不添加
// [] 将最后面的'B'去掉，并从后面添加'B'对应的邻接点'A'，'C'，'D'，由于'A'，'C'，'D'重复，故不添加
// 结果为每次数组的最后一个数
function DFS(graph, start) {
  // start 起始点 比如为 'A'
  let res = []
  let stack = []
  let visited = new Set()
  stack.push(start)
  visited.add(start)
  while (stack.length > 0) {
    vertex = stack.pop()
    res.push(vertex)
    // 遍历 键vertex对应的值['B', 'C']之类的
    for (node of graph[vertex]) {
      if (!visited.has(node)) {
        stack.push(node)
        visited.add(node)
      }
    }
  }
  return res // ['A', 'C', 'E', 'D', 'F', 'B']
}

DFS(graph, 'A')
