let arr = [1, 2, 3, null, 4, null, 5, null, null, 6, 7, null, null, 8]

// 数组转树
const arr2tree = (arr, rootIndex = 0) => {
  if (rootIndex >= arr.length || arr[rootIndex] === null) {
    return null
  }
  return {
    val: arr[rootIndex],
    left: arr2tree(arr, rootIndex * 2 + 1),
    right: arr2tree(arr, rootIndex * 2 + 2)
  }
}

// 树还原成数组
const tree2arr = (root, index = 0, res = []) => {
  if (root) {
    res[index] = root.val
    tree2arr(root.left, index * 2 + 1, res)
    tree2arr(root.right, index * 2 + 2, res)
  }
  return res
}

let tree = arr2tree(arr)
let arrRes = tree2arr(tree)

console.log(tree, arrRes)
