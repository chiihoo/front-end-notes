



```js
// Object.defineProperty劫持对象
function convert (obj) {
	Object.keys(obj).forEach(key => {
		let internalValue = obj[key]
		Object.defineProperty(obj, key, {
			get() {
        console.log(`getting key "${key}": ${internalValue}`)
				return internalValue
			},
			set (newValue) {
      	console.log(`setting key "${key}" to: ${newValue}`)
				internalValue = newValue
			}
		})
	})
}
```

```js
// 依赖收集
window.Dep = class Dep {
  constructor () {
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
function autorun (update) {
	function wrappedUpdate() {
    activeUpdate = wrappedUpdate
    update() // 也就是底下的dep.depend()
    activeUpdate = null
  }
  wrappedUpdate()
}

const dep = new Dep()
// 收集依赖
autorun(() => {
  // 进行订阅
  dep.depend()
  console.log('updated')
})
// 
dep.notify()
```

