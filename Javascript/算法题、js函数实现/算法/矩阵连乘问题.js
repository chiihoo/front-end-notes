// A1(30x35),A2(35x15),A3(15x5),A4(5x10),A5(10x20),A6(20x25)  
// 6个矩阵，传进去的参数共7个数
MatrixChain([30, 35, 15, 5, 10, 20, 25])
function MatrixChain(p) {
  //创建 p.length-1行 p.length-1列 的二维数组m和s
  let m = []  // m存储最小数乘次数
  let s = []  // s存储最小数乘次数对应的断开位置k
  for (let n = 1; n < p.length; n++) {
    m[n] = new Array(p.length)
    m[n][n] = 0;  //把二维数组m对角线位置的元素全部置为0
    s[n] = new Array(p.length)
  }
  for (let r = 2; r < p.length; r++) {  //r表示斜对角线上的层数
    for (let i = 1; i < p.length - r + 1; i++) {  //i表示第r层斜对角线上第i行
      let j = i + r - 1  //第r层斜对角线第i行对应元素的列数
      m[i][j] = m[i + 1][j] + p[i - 1] * p[i] * p[j]  //记录断开位置为i时的数乘次数
      s[i][j] = i  //记录断开位置
      for (let k = i + 1; k < j; k++) {  //当断开位置大于i时
        let temp = m[i][k] + m[k + 1][j] + p[i - 1] * p[k] * p[j]
        if (temp < m[i][j]) {
          m[i][j] = temp  //记录当前最小的数乘次数
          s[i][j] = k  //记录断开位置
        }
      }
    }
  }
  // 得到 最小数乘次数minTimes 以及与之对应的断开位置minLocation
  let [minTimes, minLocation] = [m[1][p.length - 1], s[1][p.length - 1]]
  console.log(`最小的数乘次数为${minTimes},对应的断开位置为${minLocation}`)
  // 打印结果
  let str = ''
  function printResult(i, j) {
    if (i == j) {
      str += 'A' + i
    } else {
      str += '('
      printResult(i, s[i][j])
      printResult(s[i][j] + 1, j)
      str += ')'
    }
  }
  printResult(1, p.length - 1)
  console.log('具体结果为:' + str)
}



