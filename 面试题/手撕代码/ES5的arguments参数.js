
function a(a, b, c) {
  console.log(arguments)
  console.log(arguments[0])
  // console.log(arguments.slice(1))  // 报错
  console.log(Array.prototype.slice.call(arguments, 1))
}
a(1, 2, 3)