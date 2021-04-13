function pack(weight, value, capacity) {
  let size = weight.length // 物品的件数
  let dp = Array(capacity)
  for (let i = 0; i < dp.length; i++) {
    dp[i] = Array(size + 1)
  }
  // dp[i][j]表示剩余容量为i时，前j件物品的最大价值
  for (let i = 0; i < dp.length; i++) {
    dp[i][0] = 0
  }
  for (let j = 0; j < dp[0].length; j++) {
    dp[0][j] = 0
  }

  for (let i = 1; i < capacity; i++) {
    for (let j = 1; j <= size; j++) {
      if (i < weight[j - 1]) {
        // 当前剩余容量比第j - 1件小，装不下
        dp[i][j] = dp[i][j - 1]
      } else {
        // 装得下
        dp[i][j] = Math.max(dp[i][j - 1], dp[i - weight[j - 1]][j - 1] + value[j - 1])
      }
    }
  }
  return dp[capacity - 1][size]
}

let weight = [4, 5, 6, 2, 2]
let value = [6, 4, 5, 3, 6]
console.log(pack(weight, value, 10))
