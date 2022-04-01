class MyPromise {
  constructor(executor) {
    this.value
    this.status = 'pending'
    this.resolveQueue = []
    this.rejectQueue = []

    const resolve = value => {
      if (this.status === 'pending') {
        this.status = 'fulfilled'
        this.value = value
        // 异步任务执行中的状态是pending，需要先将then传的函数参数都存起来
        // 如果同一个Promise有多个then，就需要用数组存，等异步任务完成后再一个个执行
        this.resolveQueue.forEach(fn => fn())
      }
    }
    const reject = err => {
      if (this.status === 'pending') {
        this.status = 'rejected'
        this.value = err
        this.rejectQueue.forEach(fn => fn())
      }
    }

    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  then(onFulFilled, onRejected) {
    if (typeof onFulFilled !== 'function') {
      onFulFilled = v => v
    }
    if (typeof onRejected !== 'function') {
      onRejected = err => {
        throw err
      }
    }

    return new MyPromise((resolve, reject) => {
      if (this.status === 'fulfilled') {
        // 为什么外面要包一层setTimeout？
        // new Promise(resolve=>{setTimeout(resolve(1),1000)}).then()的执行过程是先执行then,再执行resolve
        // 如果new Promise(resolve=>resolve(1))里面传入的是一个不包含异步操作的函数，resolve就会先于then执行
        // 要保持一致，无论resolve是同步或异步执行，都将resolve的执行放到then后面
        setTimeout(() => {
          try {
            let x = onFulFilled(this.value)
            // then里面调用的onFulFilled函数里面，要把return的值传递下去，如果没有return，那就传递undefined
            // 如果return的东西依旧是Promise，则后续的then需要挂载到这个新的Promise上
            if (x instanceof MyPromise) {
              x.then(resolve, reject)
            } else {
              resolve(x)
            }
          } catch (err) {
            reject(err)
          }
        }, 0)
      }

      if (this.status === 'rejected') {
        setTimeout(() => {
          try {
            let x = onRejected(this.value)
            if (x instanceof MyPromise) {
              x.then(resolve, reject)
            } else {
              resolve(x)
            }
          } catch (err) {
            reject(err)
          }
        }, 0)
      }

      if (this.status === 'pending') {
        this.resolveQueue.push(() => {
          setTimeout(() => {
            try {
              let x = onFulFilled(this.value)
              if (x instanceof MyPromise) {
                x.then(resolve, reject)
              } else {
                resolve(x)
              }
            } catch (err) {
              reject(err)
            }
          }, 0)
        })
        this.rejectQueue.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.value)
              if (x instanceof MyPromise) {
                x.then(resolve, reject)
              } else {
                resolve(x)
              }
            } catch (err) {
              reject(err)
            }
          })
        }, 0)
      }
    })
  }
}

const p = new MyPromise((resolve, reject) => {
  console.log(1)
  setTimeout(() => {
    resolve(1)
  }, 1000)
})

p.then(value => {
  console.log(value + 1)
  return value + 1
})
  .then(value => {
    console.log(value + 1)
  })
  .then(value => {
    return new MyPromise((resolve, reject) => {
      console.log('mp')
      resolve('mp')
    })
  })
  .then(value => {
    console.log(value)
  })

// p.then(value => {
//   console.log(value + 2)
//   // return value + 2
// })

// new MyPromise(resolve => resolve(8))
//   .then()
//   .then()
//   .then(value => {
//     console.log('x', value)
//   })
