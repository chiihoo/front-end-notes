`Object.create(proto, [propertiesObject])`方法会创建一个新对象，这个对象以第一个参数为原型，第二个参数为可选项，会添加到新创建对象的可枚举属性上。

```js
// new Object() 方式创建
var a = {  rep : 'apple' }
var b = new Object(a)
console.log(b) // {rep: "apple"}
console.log(b.__proto__) // {}
console.log(b.rep) // {rep: "apple"}

// Object.create() 方式创建
var a = { rep: 'apple' }
var b = Object.create(a)
console.log(b)  // {}
console.log(b.__proto__) // {rep: "apple"}
console.log(b.rep) // {rep: "apple"}
```

```js
o = Object.create({ a: 6 }, { 
  foo: { value: 42 }, 
  bar: { writable: true, configurable: true, value: 'hello' }
})

console.log(o) // {foo: 42, bar: "hello"}
console.log(o.__proto__) // {a: 6}
```





`Object.setPrototypeOf(obj, prototype)`方法可以用来设置一个对象的`prototype`

相当于直接给`obj.__proto__ `赋值 

```js
var p = {
    y: 20,
    z: 40
}
var o = { x: 10 }
Object.setPrototypeOf(o, p)
// 相当于o.__proto__ = p

console.log(o) // {x: 10}
console.log(o.__proto__) // {y: 20, z: 40}
```





`Object.getPrototypeOf(obj)`可以读取一个对象的原型对象

相当于直接读取`obj.__proto__ ` 的值

```jsx
Object.getPrototypeOf('foo') === String.prototype // true
// 相当于 'foo'.__proto__
Object.getPrototypeOf(true) === Boolean.prototype // true
// 相当于 true.__proto__
```





`Object.assign(target, ...sources)`方法是浅拷贝，用于将一个或者多个对象的可枚举的值从源对象复制到目标对象，并返回目标对象target

```js
let o = { a: 1 }
let copy = Object.assign(o, { a: 2, b:3 }, {c: 5})

// 跟{...o, ...{a: 2, b:3}, ...{c:5}}一个效果

console.log(copy) // {a: 2, b: 3, c: 5}
console.log(o === copy) // true
```


