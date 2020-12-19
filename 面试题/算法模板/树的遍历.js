// 递归都很类似，只是将递归语句的顺序换了下

// 中序
const inorderTravelsal1 = root => {
  let res = []
  const fn = root => {
    if (root === null) return
    if (root.left) {
      return fn(root.left)
    }
    res.push(root.val)
    if (root.right) {
      return fn(root.right)
    }
  }
  fn(root)
  return res
}

// 前序
const preorderTravelsal1 = root => {
  let res = []
  const fn = root => {
    if (root === null) return
    res.push(root.val)
    if (root.left) {
      return fn(root.left)
    }
    if (root.right) {
      return fn(root.right)
    }
  }
  fn(root)
  return res
}

// 后序
const postorderTravelsal1 = root => {
  let res = []
  const fn = root => {
    if (root === null) return
    if (root.left) {
      return fn(root.left)
    }
    if (root.right) {
      return fn(root.right)
    }
    res.push(root.val)
  }
  fn(root)
  return res
}

// 非递归，迭代

// 中序
const inorderTravelsal2 = root => {
  let res = []
  let stack = []
  while (root !== null || stack.length > 0) {
    while (root !== null) {
      stack.push(root)
      root = root.left
    }
    root = stack.pop()
    res.push(root.val)
    root = root.right
  }
  return res
}

// 前序，深度优先搜索
const preorderTravelsal2 = root => {
  let res = []
  if (root === null) {
    return res
  }
  let stack = []
  stack.push(root)
  while (stack.length > 0) {
    let node = stack.pop() // 都为pop()
    res.push(node.val) // push
    // 先right后left
    if (node.right) {
      stack.push(node.right)
    }
    if (node.left) {
      stack.push(node.left)
    }
  }
  return res
}

// 后序，深度优先搜索，在前序基础上进行修改两个地方，res.unshift() 和 先left后right
// 逆前序遍历结果的逆序
// 树为 1 2 3 4 5 6 7
// 前序为 1 2 4 5 3 6 7
// 先left后right，1 3 7 6 2 5 4，相当于前序遍历顺序左右对称换过来了
// push换成unshift，4 5 2 6 7 3 1，正好为后序遍历的顺序
// 相当于是root->左下->右下，先变成root->右下->左下，后变成左下->右下->root
const preorderTravelsal2 = root => {
  let res = []
  if (root === null) {
    return res
  }
  let stack = []
  stack.push(root)
  while (stack.length > 0) {
    let node = stack.pop() // 都为pop()
    res.unshift(node.val) // 这里由push变成了unshift
    // 先left后right
    if (node.left) {
      stack.push(node.left)
    }
    if (node.right) {
      stack.push(node.right)
    }
  }
  return res
}

// 前序和后序如果不用上述模板的写法
// 前序
const preorderTravelsal3 = root => {
  let res = []
  let stack = []
  while (root !== null || stack.length > 0) {
    while (root !== null) {
      res.push(root.val)
      stack.push(root)
      root = root.left
    }
    root = stack.pop()
    root = root.right
  }
  return res
}

// 后序也可以照着前序改,res.push换成
const postorderTravelsal3 = root => {
  let res = []
  let curr = root
  let stack = []
  // 变量last用于保存当前栈顶所弹出的元素，判断 curr.right == last 是为了避免重复访问同一个元素而陷入死循环当中
  let last = null
  while (curr !== null || stack.length > 0) {
    while (curr !== null) {
      stack.push(curr)
      curr = curr.left
    }
    curr = stack[stack.length - 1]
    if (curr.right === null || curr.right === last) {
      res.push(curr.val)
      stack.pop()
      last = curr
      curr = null
    } else {
      curr = curr.right
    }
  }
  return res
}
