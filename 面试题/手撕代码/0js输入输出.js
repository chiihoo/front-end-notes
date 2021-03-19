// JavaScript V8
while ((line = readline())) {
  let lines = line.split('')
  let a = parseInt(lines[0])
  let b = parseInt(lines[1])
  print(a + b)
  console.log(a + b)
}

// 可以一行一行读
let line = readline()
let row = +line
for (let i = 0; i < row; i++) {
  line = readline()
  let arr = line.split(' ')
  let a = +arr[0]
  let b = +arr[1]
  console.log(a + b)
}

// Node
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
rl.on('line', function (line) {
  let lines = line.split(' ')
  let a = parseInt(lines[0])
  let b = parseInt(lines[1])
  console.log(a + b)
})

// 赛码网
// Javascript
var N, M
// 每组第一行是2个整数，N和M，至于为啥用while，因为是多组。
while ((N = readInt()) != null && (M = readInt()) != null) {
  print(N + ' ' + M)
  // 循环读取“接下来的M行”
  for (let i = 0; i < M; i++) {
    let a = readInt()
    let b = readInt()
    let c = readInt()
    // 每行是3个整数，a，b，c。
    print(a + ' ' + b + ' ' + c)
  }
  // M行读取完了，就又要开始下一组了，去while那里。
}

var str = read_line().split(' ')

// 读取size个字符：gets(size)
// 将读取至多size个字符，当还未达到size个时如果遇到回车或结束符，会提前结束。回车符可能会包含在返回值中。
// 输出信息：printsth(sth, ...)
// 往控制台输出sth，当有多个参数时，空格分隔；最后不加回车。
// 输出一行：print(sth, ...) console.error(sth, ...) console.debug(sth, ...) console.info(sth, ...) console.log(sth, ...)
// 往控制台输出sth，当有多个参数时，空格分隔；最后加回车。
// 读取一个（长）整数：readInt()
// 从控制台读取一个（长）整数。
// 读取一个浮点型：readDouble()
// 从控制台读取一个浮点型。
// 读取一行输入：read_line()
// 将读取至多1024个字符，当还未达到1024个时如果遇到回车或结束符，提前结束。读取多行最简单的办法是while((line = read_line()) != '')。

let a, b
while ((a = readInt()) !== undefined && (b = readInt()) !== undefined) {
  let arr1 = []
  let arr2 = []
  for (let i = 0; i < a; i++) {
    arr1.push(readInt())
  }
  for (let j = 0; j < b; j++) {
    arr2.push(readInt())
  }
  let set = new Set()
  for (let item of arr1) {
    set.add(item)
  }
  for (let item of arr2) {
    set.add(item)
  }
  let res = [...set]
  res.sort((a, b) => a - b)
  print(...res)
}

let a, b
while ((a = readInt()) !== undefined && (b = readInt()) !== undefined) {
  let arr1 = [],
    arr2 = []
  for (let i = 0; i < a; i++) {
    arr1.push(readInt())
  }
  for (let i = 0; i < a; i++) {
    arr2.push(readInt())
  }
  let map = {}
  for (let item of arr2) {
    if (item in map) {
      map[item] += 1
    } else {
      map[item] = 1
    }
  }
  let temp = []
  for (let item in map) {
    temp.push(map[item])
  }
  temp.sort((a, b) => b - a)
  arr1.sort((a, b) => a - b)
  console.log(temp, arr1)

  let min = 0
  let max = 0
  let len = arr1.length
  for (let i = 0; i < temp.length; i++) {
    max += temp[i] * arr1[len - 1]
    len--
  }
  let x = 0
  for (let i = 0; i < temp.length; i++) {
    min += temp[i] * arr1[x++]
  }
  console.log(min, max)
}


// 读字符一定要read_line