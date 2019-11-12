// 前序遍历
//递归
var preorderTraversal = function(root) {
  function solution(root, res) {
    if (root) {
      res.push(root.val)
      if (root.left) {
        solution(root.left, res)
      }
      if (root.right) {
        solution(root.right, res)
      }
    }
  }
  let res = []
  solution(root, res)
  return res
}

//中序遍历
//递归
var inorderTraversal = function(root) {
  function solution(root, res) {
    if (root) {
      if (root.left) {
        solution(root.left, res)
      }
      res.push(root.val)
      if (root.right) {
        solution(root.right, res)
      }
    }
  }
  let res = []
  solution(root, res)
  return res
}

//后序遍历
//递归
var postorderTraversal = function(root) {
  function solution(root, res) {
    if (root) {
      if (root.left) {
        solution(root.left, res)
      }
      if (root.right) {
        solution(root.right, res)
      }
      res.push(root.val)
    }
  }
  let res = []
  solution(root, res)
  return res
}

//前序遍历
//非递归   我是想不出来的
var preorderTraversal = function(root) {
  let res = []
  let stack = []
  if (!root) {
    return res
  }
  stack.push(root)
  while (stack.length) {
    //不能加上root!=null，因为stack空了的话，如果还要进行循环，那么stack.pop()会报错
    root = stack.pop()
    res.push(root.val)
    if (root.right) {
      //后进先出
      stack.push(root.right)
    }
    if (root.left) {
      stack.push(root.left)
    }
  }
  return res
}

//中序遍历
//非递归 使用栈,用数组的单向存入取出实现
var inorderTraversal = function(root) {
  let res = []
  let stack = []
  while (root != null || stack.length != 0) {
    //在刚好运行到根节点的右边时，stack.length==0，但root!=null
    while (root != null) {
      stack.push(root)
      root = root.left
    }
    root = stack.pop()
    res.push(root.val)
    root = root.right
  }
  return res
}

//后序遍历
//非递归   这个有难度，我是看答案的
var postorderTraversal = function(root) {
  let res = []
  let stack = []
  let lastVisit = null //记录最近一次已经访问过的结点
  while (root != null || stack.length != 0) {
    while (root != null) {
      stack.push(root)
      root = root.left
    }
    root = stack[stack.length - 1] //就是stack.top()
    if (root.right == null || root.right == lastVisit) {
      //如果没有右子树或者右子树已经访问过了，就把root添加进res
      root = stack.pop() //虽然不加这句，两个root值相同，但必须要加，需要把stack最外面删掉
      res.push(root.val)
      lastVisit = root
      root = null //这句是为了跳过上面里层的while(root!=null){stack.push(root);root=root.left;}循环
    } else {
      root = root.right
    }
  }

  return res
}
