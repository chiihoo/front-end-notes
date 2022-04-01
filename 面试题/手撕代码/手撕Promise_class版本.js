// https://zhuanlan.zhihu.com/p/21834559?utm_source=tuicool&utm_medium=referral
// https://juejin.im/post/6845166891061739528#heading-11

// class版本
class Promise {
  constructor(executor) {
    this.status = 'pending'
    this.value
    // 当 resolve在异步函数比如setTimeout中执行，then时state还是pending等待状态。
    // 并且同一个Promise可以附加多个then，比如 p.then(v=>console.log(1)); p.then(v=>console.log(2))，所以需要用数组存，而不是直接赋值
    // 这就需要把后续多个操作存起来，并且由于不知道Promise操作是否成功，成功和失败的操作都需要存到数组中，并在改变状态时遍历调用
    this.resolveQueue = []
    this.rejectQueue = []

    // 这里用箭头函数，不用保存this，如果是function就需要保存this
    const resolve = data => {
      // setTimeout(() => {}, 0)使函数异步调用
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
  // 写在constructor里面的this方法是实例方法，每次生成一个新的实例，实例方法都会不一样
  // 写在constructor外面的方法是挂载在prototype上的原型方法，可以被所有实例共享
  then(onResolved, onRejected) {
    // 必须为函数
    if (typeof onResolved !== 'function') {
      onResolved = value => value
    }
    if (typeof onRejected !== 'function') {
      onRejected = err => {
        throw err
      }
    }

    const resolvePromise = (resolve, reject) => {
      setTimeout(() => {
        try {
          // 注意这里的this.value，这里用的箭头函数可以，如果用的function就需要在该函数外先把this先保存为self了
          let x = onResolved(this.value)
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
    const rejectPromise = (resolve, reject) => {
      setTimeout(() => {
        try {
          let x = onRejected(this.value)
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

    // then的时候在fulfilled状态
    if (this.status === 'fulfilled') {
      return new Promise((resolve, reject) => {
        resolvePromise(resolve, reject)
      })
    }
    // then的时候在rejected状态
    if (this.status === 'rejected') {
      return new Promise((resolve, reject) => {
        rejectPromise(resolve, reject)
      })
    }
    // then的时候在'pending'状态，此时resolve()可能在异步函数中，暂时未调用，
    // 也无法确定是调用成功与否，所以都添加进去
    if (this.status === 'pending') {
      return new Promise((resolve, reject) => {
        this.resolveQueue.push(() => {
          resolvePromise(resolve, reject)
        })
        this.rejectQueue.push(() => {
          rejectPromise(resolve, reject)
        })
      })
    }
  }

  catch(onRejected) {
    return this.then(null, onRejected)
  }
}

// 这里不要用箭头函数Promise.resolve = val => {}，否则this不是指向class Promise
Promise.resolve = function (val) {
  return new Promise((resolve, reject) => {
    resolve(val)
  })
}

Promise.reject = function (val) {
  return new Promise((resolve, reject) => {
    reject(val)
  })
}

Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    let resArr = []
    let count = 0
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(
        value => {
          resArr[i] = value
          if (++count === promises.length) {
            resolve(resArr)
          }
        },
        reject
        // 跟() => reject()一个效果，任意一个报错，直接就调用return的Promise的reject
      )
    }
  })
}

Promise.allSettled = function (promises) {
  return new Promise((resolve, reject) => {
    let resArr = []
    let count = 0
    for (let i = 0; i > promises.length; i++) {
      promises[i].then(
        value => {
          resArr[i] = value
          if (++count === promises.length) {
            resolve()
          }
        },
        err => {
          resArr[i] = err
          // allSettled不能调用reject，就算有promise报错，最后还是要resolve
          if (++count === promises.length) {
            resolve()
          }
        }
      )
    }
  })
}

Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    // promises.forEach(item => {
    //   item.then(resolve, reject)
    // })
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(resolve, reject)
      // 相当于promises[i].then(() => resolve(), () => reject())
      // 当任意一个promise完成时，直接就调用resolve结束了return的这个Promise了
    }
  })
}

Promise.promisify = function (fn) {
  return (...args) => {
    return new Promise((resolve, reject) => {
      // fn最后一个参数为callback，只需要args的长度大于等于fn参数除去最后一个callback的长度即可
      if (args.length >= fn.length - 1) {
        // fn的回调函数使用nodejs的规范，为callback(err, data)
        fn(...args, (err, value) => {
          if (err) {
            reject(err)
          }
          resolve(value)
        })
      }
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
