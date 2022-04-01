// https://zhuanlan.zhihu.com/p/21834559?utm_source=tuicool&utm_medium=referral
// https://juejin.im/post/6845166891061739528#heading-11

// 面试写function版本的

// Promise是ES6出的一个异步的方法，它解决了回调函数多层嵌套的问题
// 它维护了一个状态，pending，fulfilled，rejected，还有一个数据value
// 还有一个resolvedQueue和rejectedQueue队列
// 它的构造函数还会传进去一个叫executor [ɪɡˈzekjətər]的函数参数，executor有resolve和reject两个参数
// 当调用resolve(data)时，会把pending状态转换成fulfilled，把数据存进去，并且调用resolvedQueue存储的所有处理函数
// 当调用reject(data)时，会把pending状态转换成rejected，把数据存进去，并且调用rejectedQueue存储的所有处理函数
// 这个resolvedQueue是在then里面，如果是pending状态就会把对应的处理放进去的，它会调用then的第一个函数参数，
// 如果结果是Promise类型的，就会继续调用一个then，如果不是，就把值传给下一个

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
  try {
    executor(resolve, reject)
  } catch (err) {
    reject(err)
  }
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
  let self = this
  return new Promise((resolve, reject) => {
    let resolvePromise = () => {
      // 为什么外面要包一层setTimeout？
      // new Promise(resolve=>{setTimeout(resolve(1),1000)}).then()的执行过程是先执行then,再执行resolve
      // 如果new Promise(resolve=>resolve(1))里面传入的是一个不包含异步操作的函数，resolve就会先于then执行
      // 要保持一致，无论resolve是同步或异步执行，都将resolve的执行放到then后面
      setTimeout(() => {
        try {
          let x = onResolved(self.value) // 差别在这 onResolved()
          if (x instanceof Promise) {
            // 如果then第一个参数里面自己返回了一个Promise，那么就用它继续调用then，等待异步手动调用resolve再下一步
            x.then(resolve, reject)
          } else {
            // 否则直接调用resolve()，将值传给下一个then
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
          let x = onRejected(self.value) // 差别在这 onRejected()
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

    if (self.status === 'fulfilled') {
      resolvePromise()
    }
    if (self.status === 'rejected') {
      rejectPromise()
    }
    if (self.status === 'pending') {
      self.resolveQueue.push(resolvePromise)
      self.rejectQueue.push(rejectPromise)
      // 等价于resolveQueue.push(() => resolvePromise())
    }
  })
}

Promise.prototype.catch = function (onRejected) {
  this.then(null, onRejected)
}

// 回调会在当前promise运行完毕后被调用，无论当前promise的状态是完成(fulfilled)还是失败(rejected)
// onFinally回调函数不管fulfilled还是rejected都会被调用，并且没有参数
// Promise.prototype.finally = function (onFinally) {
//   return this.then(
//     value => Promise.resolve(onFinally()).then(() => value),
//     err =>
//       Promise.resolve(onFinally()).then(() => {
//         throw err
//       })
//   )
// }
Promise.prototype.finally = function (callback) {
  return this.then(
    value => {
      callback()
      return new Promise(resolve => resolve(value))
    },
    err => {
      callback()
      return new Promise(resolve => resolve(err))
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

// new Promise里面可以异步操作，操作完成调用resolve
// then里面如果要异步操作，则需要返回一个新的Promise
new Promise(resolve => resolve(8))
  .then()
  .then(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(5)
      }, 1000)
    })
  })
  .then(value => {
    console.log('x', value)
    return value
  })
  .finally(() => {
    // finally的函数参数是没有传递参数的
    console.log('finally')
  })

// Promise.all提前catch
// Promise.all(
//   [Promise.resolve(1), Promise.resolve(2), Promise.resolve(2)].map(item =>
//     item.catch(err => console.log(err))
//   )
// ).then(res => {
//   console.log(res)
// })
