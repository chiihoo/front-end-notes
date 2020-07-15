// 要求1：按以下要求输出
// human('Jack').eat().sleep(5).go().rest(10);
// // I am Jack
// // Eat
// // 等 5 秒
// // Sleep 1s
// // Go
// // 等 10 秒
// // Rest 10s

// 要求2：eat/sleep/go/rest可以改变任意顺序
// human('Jack').sleep(5).eat().rest(10).go();



// 写法一

// // 箭头函数是不能new实例化的
// const Human = function (name) {
//   this.name = name
//   this.queue = Promise.resolve(1)
//   console.log(`I am ${name}`)
// }
// Human.prototype.eat = function () {
//   this.queue = this.queue.then(() => {
//     return new Promise(resolve => {
//       console.log('Eat')
//       resolve()
//     })
//   })
//   return this
// }
// Human.prototype.sleep = function (time) {
//   // this.queue = Promise.resolve(1)
//   // this.queue.then(v1 => 2).then(v2 => 3) 这样才可以连起来 v1=1,v2=2
//   // this.queue.then(v1 => 2); this.queue.then(v2 => 3) 而分开的就连不起来 v1=1,v2=1
//   this.queue = this.queue.then(() => {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         console.log(`Sleep ${time}s`)
//         resolve()
//       }, time * 1000)
//     })
//   })
//   return this
// }
// Human.prototype.go = function (time) {
//   this.queue = this.queue.then(() => {
//     return new Promise(resolve => {
//       console.log(`Go`)
//       resolve()
//     })
//   })
//   return this
// }
// Human.prototype.rest = function (time) {
//   this.queue = this.queue.then(() => {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         console.log(`Rest ${time}s`)
//         resolve()
//       }, time * 1000)
//     })
//   })
//   return this
// }

// const human = name => {
//   return new Human(name)
// }

// human('chiho').eat().sleep(3).go().rest(3.5)



// 写法二 类
class Human {
  constructor(name) {
    this.name = name
    this.queue = Promise.resolve()
    console.log(`I am ${name}`)
  }
  eat() {
    this.queue = this.queue.then(() => {
      return new Promise(resolve => {
        console.log('Eat')
        resolve()
      })
    })
    return this
  }
  sleep(time) {
    // this.queue = Promise.resolve(1)
    // this.queue.then(v1 => 2).then(v2 => 3) 这样才可以连起来 v1=1,v2=2
    // this.queue.then(v1 => 2); this.queue.then(v2 => 3) 而分开的就连不起来 v1=1,v2=1
    this.queue = this.queue.then(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log(`Sleep ${time}s`)
          resolve()
        }, time * 1000)
      })
    })
    return this
  }
  go() {
    this.queue = this.queue.then(() => {
      return new Promise(resolve => {
        console.log(`Go`)
        resolve()
      })
    })
    return this
  }
  rest(time) {
    this.queue = this.queue.then(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log(`Rest ${time}s`)
          resolve()
        }, time * 1000)
      })
    })
    return this
  }
}

const human = name => {
  return new Human(name)
}

human('chiho').eat().sleep(3).go().rest(3.5)
