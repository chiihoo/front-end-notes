`Object.defineProperty(obj, prop, descriptor)` 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象

```js
let obj = {}
let v = 5
Object.defineProperty(obj, 'foo', {
	enumerable: true, // 可枚举
	configurable : false, // 属性不可被更改、删除
	// writable: false, // 属性不可被赋值，不能跟set(){}同时使用
	// value: 30, // 不能跟get(){}同时使用
	
	get() { // 覆盖.取值行为
		return v
	},
	set(newValue) { // 覆盖赋值行为
		v = newValue
	}
})
```

