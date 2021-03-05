// 依赖收集
class Dep {
  constructor() {
    // 记录订阅者，Set避免重复相同的任务
    this.subscribers = new Set()
  }
  // 订阅，注册依赖项
  depend() {
    if (activeUpdate) {
      this.subscribers.add(activeUpdate)
    }
  }
  // 发布，通知所有订阅者
  notify() {
    this.subscribers.forEach(sub => sub())
  }
}

// 每次调用autorun函数时，该值作为一个depend函数中的变量，将wrappedUpdate更新函数进行注册，之后该值赋值为null
let activeUpdate
// 用于注册自动更新的代码
function autorun(update) {
  // function wrappedUpdate() {
  //   activeUpdate = wrappedUpdate
  //   update() // 这里的update只是console.log('updated:' + state.count)，当然也可以写些dep.depend()之类的语句
  //   activeUpdate = null
  // }
  // wrappedUpdate()
  // 也可以不要wrappedUpdate，写成底下这种
  activeUpdate = update
  // update()
  // activeUpdate = null
}

// 对obj进行观察，当读取某个值时，注册该依赖。当set新值时，通知所有订阅
function observer(obj) {
  if (Object.prototype.toString.call(obj) !== '[object Object]') {
    // obj不为对象时，退出
    return
  }
  Object.keys(obj).forEach(key => {
    // if (Object.prototype.toString.call(obj[key]) === '[object Object]') {
    //   // obj[key]为对象时，递归
    //   observer(obj[key])
    //   return
    // }
    let internalValue = obj[key]
    // 生成Dep实例
    let dep = new Dep()
    // 用Object.defineProperty劫持对象
    Object.defineProperty(obj, key, {
      get() {
        // 注册依赖项
        dep.depend()
        return internalValue
      },
      set(newValue) {
        // 当变化了新值，就通知所有订阅
        if (internalValue !== newValue) {
          internalValue = newValue
          dep.notify() // 这里是会调用console.log('updated:' + state.count)
        }
      }
    })
  })
}

const state = {
  count: 0,
  obj: { a: 5 }
}
observer(state)

autorun(() => {
  // 这里用update()调用了state.count，触发了get
  console.log('updated:' + state.count, state.obj.a)
})

state.count++
state.count++
state.obj.a++
