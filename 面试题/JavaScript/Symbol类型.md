https://es6.ruanyifeng.com/#docs/symbol

```js
let s = Symbol('foo')
s.toString() // 'Symbol(foo)'
s.description // 'foo'
```



```js
// 相同参数的Symbol是不相等的

let s1 = Symbol();
let s2 = Symbol();
s1 === s2 // false


let s1 = Symbol('foo');
let s2 = Symbol('foo');
s1 === s2 // false
```



```js
let s = Symbol

// 三种写法
// 1.
let foo = {}
foo[s] = 'hello'
// 2.
let foo = {
	[s] = 'hello'
}
// 3.
let foo = {}
Object.defineProperty(foo, s, {
	value: 'hello'
})

// 以上写法都得到同样结果
foo[mySymbol] // "hello"
```



```js
// symbol用作对象属性名时，只能通过
const mySymbol = Symbol();
const a = {};

a.mySymbol = 'Hello!';

a[mySymbol] // undefined

a['mySymbol'] // "Hello!"
a.mySymbol // "Hello!"
```



Symbol 作为属性名，遍历对象的时候，该属性不会出现在`for...in`、`for...of`循环中，也不会被`Object.keys()`、`Object.getOwnPropertyNames()`、`JSON.stringify()`返回。

但是，它也不是私有属性，有一个`Object.getOwnPropertySymbols()`方法，可以获取指定对象的所有 Symbol 属性名。该方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。





```
Symbol.for()  
它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建一个以该字符串为名称的 Symbol 值，并将其注册到全局。

Symbol.for()与Symbol()这两种写法，都会生成新的 Symbol。它们的区别是，前者会被登记在全局环境中供搜索，后者不会。

Symbol.for("bar") === Symbol.for("bar")
// true

Symbol("bar") === Symbol("bar")
// false

```

```
Symbol.keyFor()方法返回一个已登记的 Symbol 类型值的key。

let s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"

let s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined
```

