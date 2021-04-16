`this`是`js`的一个关键字，它是在运行时绑定的，它的绑定跟声明位置无关，只取决于调用位置（除了箭头函数）。

`this`的绑定有很多规则

1. **默认绑定**

默认绑定指的是 在全局作用域下的函数，它的`this`，在非严格模式下，会绑定在全局对象`window`上面，而严格模式下，则不会绑定。

```js
function foo() {
  console.log(this.a)
}
var a = 2 // var或者不写都会把a绑定到window上
foo() // 2
// ————————————————————————————
function foo() {
  console.log(this.a)
}
let a = 2
foo() // undefined
```

2. **隐式绑定**

隐式绑定指的是 函数作为对象`obj`的一个键值的时候，它的this会绑定在这个上下文对象`obj`上

```js
let obj = {
  a: 2,
  foo() {
    console.log(this.a)
  },
}
obj.foo() // 2
// 底下为隐式丢失，可以用call,apply,bind显式绑定来解决
let bar = obj.foo
bar() // 采用了默认绑定
```



```js
let obj = {
  a: 2,
  b: {
    // a:5, 底下的obj.b.foo()只能读到这里的a
    foo() {
      console.log(this.a)
    },
  },
}
obj.b.foo() // undefined
```

3. **显式绑定**

显式绑定指的是`call`，`apply`，`bind`

```js
Function.prototype.call(thisArg, arg1, arg2, ...)

Function.prototype.apply(thisArg, [argsArray])

Function.prototype.bind(thisArg[, arg1[, arg2[, ...]]])
```



4. **new绑定**

`this`会指向生成出来的实例对象

```js
function foo() {
  this.a = 1
}
let obj = new foo()
obj.a  // 1
```

但有特殊情况，如果构造函数return了一个对象，`this`会绑定到返回的这个对象上面

```js
function foo() {
  this.a = 1
  return {} // 返回了一个对象
}
let obj = new foo()
obj.a  // undefined
```

而如果返回的是别的基础数据类型，则`this`仍绑定到实例对象上

```js
function foo() {
  this.a = 1
  return 5
  // return null
}
let obj = new foo()
obj.a  // 1
```



**优先级：new绑定 > 显示绑定 > 隐式绑定 > 默认绑定**



5.**箭头函数**

箭头函数没有自己的this，它的this默认指向定义时的宿主对象，也就是使用的外部的this

另外**箭头函数不能作为构造函数，也没有prototype**

**因为箭头函数没有自己的this，它的this来自于外部，而构造函数需要this来接收外部传来的参数，另外箭头函数也没有prototype，也没法在new的时候将实例与箭头函数进行绑定**

```js
// 当在事件监听函数中使用箭头函数时，this指向Window
const button = document.createElement('button')
button.addEventListener('click', () => {
	console.log(this)  // Window
})
button.addEventListener('click', function () {
  console.log(this)  // button元素
})

// 包括在原型链上添加方法使用箭头函数，this也会指向Window
function Cat() {}
Cat.prototype.sayName = () => {
  console.log(this) // Window
}
Cat.prototype.sayName = function () {
  console.log(this) // Cat {}
}
let cat = new Cat('mm')
cat.sayName()
```


