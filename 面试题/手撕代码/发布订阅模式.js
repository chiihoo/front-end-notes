// 发布订阅模式就是事件总线维护了一个对象，并且提供了订阅者注册事件；订阅者取消某事件对应的订阅；发布者发布消息，订阅者自动获取消息的功能
// 其中每一个事件可以有很多个订阅者订阅，所以 subs = {'event1': [fn11, fn12], 'event2': [fn21, fn22, f23]}
// eventBus.on：订阅者注册，参数为事件名、回调函数，将其添加到subs中
// eventBus.off：订阅者取消注册，参数为事件名、回调函数，将对应事件的对应回调函数删除
// eventBus.emit：发布者发布消息，参数为事件名、数据data，效果为将对应事件的所有回调函数执行，参数即为发布的数据data

// 事件总线
class EventChannel {
  subs = {} // subjects = {'event1': [fn11, fn12], 'event2': [fn21, fn22, f23]}

  // 订阅者订阅事件
  on(event, fn) {
    console.log(`收到订阅信息，订阅者订阅事件：${event}`)
    if (!this.subs[event]) {
      this.subs[event] = []
    }
    this.subs[event].push(fn)

    return this
  }
  // 订阅者取消某事件对应的某个订阅
  off(event, fn) {
    console.log(`收到取消订阅请求，需要取消的订阅事件：${event}`)
    if (!this.subs[event]) {
      return
    }
    if (fn) {
      const index = this.subs[event].indexof(fn)
      if (index !== -1) {
        this.subs[event].splice(index, 1)
      } else {
        this.subs[event].length = 0
      }
      // this.subs[event] = this.subs[event].filter(item => item === fn)
    }
  }
  // 发布者发布消息，执行订阅事件
  emit(event, data) {
    console.log(`收到发布者信息，执行已订阅的事件：${event}，收到的发布者消息为：${data.message}`)
    if (this.subs[event]) {
      this.subs[event].forEach(fn => fn(data))
    }
  }
}

// 订阅者
class Subscriber {
  constructor(event, fn) {
    this.event = event
    this.fn = fn
  }
}

// 发布者
class Publisher {
  constructor(event, data) {
    this.event = event
    this.data = data
  }
}

// 测试

// 订阅者
const chiho = new Subscriber('running', () => {
  console.log('chiho订阅的事件running进行了执行')
})

// 发布者
// 实际上这个data就是发布者想要发送给订阅者的数据
const puber = new Publisher('running', { message: 'puber发布running事件的消息' })
// const puber1 = new Publisher('swimming', { message: 'puber1发布swimming事件的消息' })

// 创建一个事件总线实例
const eventBus = new EventChannel()
// 订阅者订阅事件A
eventBus.on(chiho.event, chiho.fn)
// 发布者发布事件A，事件总线的subs对象中关于事件A的所有fn全部得到执行
eventBus.emit(puber.event, puber.data)
