const back = nums => {
  let res = []
  let track = []
  const backtrack = start => {
    if (满足结束条件) {
      res.push([...track])
      return
    }
    // 循环
    for (let i = start; i < nums.length; i++) {
      // 此处还可以剪枝
      track.push(xxx) //做选择
      backtrack(start + 1) // 下一个选择
      track.pop() //这小选择
    }
  }
  backtrack(0)
  return res
}
