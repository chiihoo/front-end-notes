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
