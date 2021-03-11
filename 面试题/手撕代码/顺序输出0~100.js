// https://www.nowcoder.com/discuss/490260?toCommentId=7156076

// 手撕代码题：如果一个已经封装好的log函数，log函数中是一个接收一个callback，
// log赋值了一个count的变量，初始值为0，每次执行log会有count++。
// 然后log函数内部是用一个setTimeout第一个的函数中，执行了一个console.log(count)，
// 然后执行传入的callback，setTimeout的延迟时间是一个随机数。
// 调用这个log函数顺序打印0-100。
let log = (function () {
  let count = 0
  return function (callback) {
    let time = Math.random() * 100
    setTimeout(() => {
      console.log(count++)
      callback()
    }, time)
  }
})()

// 方法一：递归调用
let count = 0
function callback() {
  if (count++ < 100) {
    log(callback)
  }
}
log(callback)

// 方法二，有点想不到
// for (let i = 0; i <= 100; i++) {
//   await new Promise(resolve => {
//     log(resolve)
//   })
// }

console.log('start')
