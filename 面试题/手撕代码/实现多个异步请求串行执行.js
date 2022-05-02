let arr = []
for (let i = 0; i < 5; i++) {
  arr[i] = function () {
    return new Promise(resolve => {
      console.log(`${i + 1}正在请求`)
      setTimeout(() => {
        resolve(`promise+${i + 1}`)
      }, 1000)
    })
  }
}

// 方法一
// async function run() {
//   for (let item of arr) {
//     await item()
//   }
// }
// run()

// 方法二
let p = Promise.resolve()
for (let item of arr) {
  p = p.then(v => {
    return new Promise(resolve => {
      resolve(item())
    })
  })
}
