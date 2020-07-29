// 注册自定义事件
const myTestEvent = new CustomEvent('myEvent', {
  detail: {
    // 此处为传递给监听函数的数据
    name: 'ChihoSy',
    age: 25
  },
  bubbles: true, // 是否冒泡，e.stopPropagation()可以阻止冒泡
  cancelable: false // 是否可以取消默认行为，当为true时，e.preventDefault()才可以阻止默认行为
})

// 监听事件
document.addEventListener('myEvent', e => {
  // e.detail可以获取到数据
  console.log(e.detail.name, e.detail.age)
})

// 用dispatchEvent触发事件
setInterval(() => {
  document.dispatchEvent(myTestEvent)
}, 1000)
