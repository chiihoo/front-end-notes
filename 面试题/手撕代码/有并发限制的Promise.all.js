// max 最大并发数
Promise.myAll = function (promises, max) {
  return new Promise((resolve, reject) => {
    let res = []
    let count = 0
    let i = 0

    function run() {
      while (max > 0 && i < promises.length) {
        max--
        promises[i++]().then(value => {
          max++
          res[count] = value
          count++
          if (count === promises.length) {
            resolve(res)
          } else {
            run()
          }
        }, reject)
      }
    }
    run()
  })
}

let arr = []
for (let i = 0; i < 12; i++) {
  arr[i] = function () {
    return new Promise(resolve => {
      console.log(`${i + 1}正在请求`)
      setTimeout(() => {
        resolve(`promise+${i + 1}`)
      }, 1500)
    })
  }
}

Promise.myAll(arr, 5).then(res => console.log(res))
