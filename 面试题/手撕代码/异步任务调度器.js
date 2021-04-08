// JS实现一个带并发限制的异步调度器Schedule，保证同时运行的任务最多有两个。完善下面代码中的Scheduler类，使得以下程序能正确输出。
// class Scheduler {
//   add(promiseCreator) {...}
//   // ...
// }
class Scheduler {
  // ——————————————————————————————————————————————————————————
  // 方法1
  constructor() {
    this.taskList = []
    this.count = 0
    this.max = 2
  }
  async add(promiseCreator) {
    this.count++
    if (this.count > this.max) {
      await new Promise(resolve => {
        this.taskList.push(resolve)
      })
    }
    let res = await promiseCreator()
    this.count--
    if (this.taskList.length > 0) {
      this.taskList.shift()()
    }
    return res
  }

  // ——————————————————————————————————————————————————————————
  // 方法2
  add2(promiseCreator) {
    // 先将四个add同步加到taskList中
    console.log('xx')
    this.taskList.push(promiseCreator)
    this.next()
  }
  next() {
    // 通过每次从taskList队头取任务，以及用最大并行数max计数，来达到调度
    while (this.count < this.max && this.taskList.length > 0) {
      this.count++
      let callback = this.taskList.shift()
      callback().then(() => {
        this.count--
        this.next()
      })
    }
  }

  // ——————————————————————————————————————————————————————————
  // add(promiseCreator) {
  //   return new Promise(resolve => {
  //     // 先将四个add同步加到taskList中
  //     console.log('xx')
  //     this.taskList.push([promiseCreator, resolve])
  //     this.next()
  //   })
  // }
  // next() {
  //   // 通过每次从taskList队头取任务，以及用最大并行数max计数，来达到调度
  //   while (this.count < this.max && this.taskList.length > 0) {
  //     this.count++
  //     let [callback, resolve] = this.taskList.shift()
  //     callback().then(() => {
  //       resolve()
  //       this.count--
  //       this.next()
  //     })
  //   }
  // }
}
const timeout = time =>
  new Promise(resolve => {
    setTimeout(resolve, time)
  })

const scheduler = new Scheduler()
const addTask = (time, order) => {
  // console.log('同步', order)
  scheduler.add(() => timeout(time).then(() => console.log('异步', order)))
}

addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')

// output: 2 3 1 4
// 一开始，1、2两个任务进入队列
// 500ms时，2完成，输入2，任务3进队
// 800ms时，3完成，输出3，任务4进队
// 1000ms时，1完成，输出1
// 1200ms时，4完成，输出4
