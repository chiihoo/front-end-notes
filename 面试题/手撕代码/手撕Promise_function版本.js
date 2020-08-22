// https://zhuanlan.zhihu.com/p/21834559?utm_source=tuicool&utm_medium=referral
// https://juejin.im/post/6845166891061739528#heading-11

// 面试写function版本的

// function版本
function Promise(executor) {
  this.value // 这里用this，是为了new Promise()出的对象里有value这个属性
  this.status = 'pending'
  this.resolveQueue = []
  this.rejectQueue = []

  const resolve = data => {
    setTimeout(() => {
      if (this.status === 'pending') {
        this.status = 'fulfilled'
        this.value = data
        this.resolveQueue.forEach(fn => fn())
      }
    }, 0)
  }
  const reject = err => {
    setTimeout(() => {
      if (this.status === 'pending') {
        this.status = 'rejected'
        this.value = err
        this.rejectQueue.forEach(fn => fn())
      }
    }, 0)
  }
  executor(resolve, reject)
}

Promise.prototype.then = function (onResolved, onRejected) {
  if (typeof onResolved !== 'function') {
    onResolved = val => val
  }
  if (typeof onRejected !== 'function') {
    onReject = err => {
      throw err
    }
  }
  return new Promise((resolve, reject) => {
    let resolvePromise = () => {
      // 为什么外面要包一层setTimeout？因为Promise本身是一个异步方法，属于微任务一列，
      // 必须得在执行栈执行完了再去取它的值，所以所有的返回值都得包一层异步setTimeout
      setTimeout(() => {
        try {
          let x = onResolved(this.value) // 差别在这 onResolved()
          if (x instanceof Promise) {
            x.then(resolve, reject)
          } else {
            resolve(x)
          }
        } catch (err) {
          reject(err)
        }
      }, 0)
    }
    let rejectPromise = () => {
      setTimeout(() => {
        try {
          let x = onRejected(this.value) // 差别在这 onRejected()
          if (x instanceof Promise) {
            x.then(resolve, reject)
          } else {
            resolve(x)
          }
        } catch (err) {
          reject(err)
        }
      }, 0)
    }

    if (this.status === 'fulfilled') {
      resolvePromise()
    }
    if (this.status === 'rejected') {
      rejectPromise()
    }
    if (this.status === 'pending') {
      this.resolveQueue.push(resolvePromise)
      this.rejectQueue.push(rejectPromise)
      // 等价于resolveQueue.push(() => resolvePromise())
    }
  })
}

Promise.prototype.catch = function (onRejected) {
  this.then(null, onRejected)
}

// 回调会在当前promise运行完毕后被调用，无论当前promise的状态是完成(fulfilled)还是失败(rejected)
// onFinally回调函数不管fulfilled还是rejected都会被调用
Promise.prototype.finally = function (onFinally) {
  this.then(
    val => {
      Promise.resolve(onFinally()).then(() => val)
    },
    err => {
      Promise.resolve(onFinally()).then(() => {
        throw err
      })
    }
  )
}

Promise.resolve = val => {
  return new Promise((resolve, reject) => {
    resolve(val)
  })
}

Promise.reject = err => {
  return new Promise((resolve, reject) => {
    reject(err)
  })
}

Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    let res = []
    let count = 0
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(
        val => {
          res[i] = val
          count++
          if (count === promises.length) {
            resolve(res)
          }
        },
        err => {
          reject(err)
        }
      )
    }
  })
}

Promise.allSettled = function (promises) {
  return new Promise((resolve, reject) => {
    let res = []
    let count = 0
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(
        val => {
          res[i] = val
          count++
          if (count === promises.length) {
            resolve(res)
          }
        },
        err => {
          res[i] = err
          count++
          if (count === promises.length) {
            reject(res)
          }
        }
      )
    }
  })
}

Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(resolve, reject)
    }
  })
}

Promise.promisify = function (fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      // fn最后一个参数为callback
      // fn的回调函数使用nodejs的规范，为callback(err, data)
      fn(...args, (err, val) => {
        if (err) {
          reject(err)
        }
        resolve(val)
      })
    })
  }
}

// const fs = require('fs)
// fs.readFile('./test.js', 'utf-8', function (err, data) {
//   if (err) {
//     console.log(err)
//   }
//   console.log(data)
// })
// let readFile = Promise.promisify(fs.readFile)
// readFile('./test.js', 'utf-8').then(value => {
//   return value + 1
// })

new Promise(resolve => resolve(8))
  .then()
  .then()
  .then(value => {
    console.log('x', value)
  })
