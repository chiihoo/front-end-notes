// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Grammar_and_types#%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E5%92%8C%E7%B1%BB%E5%9E%8B

// js有8种数据类型，其中7种为基本数据类型，1种为引用数据类型

// 基本数据类型：Number, String, Boolean, null, undefined, BigInt, Symbol
// 引用数据类型：Object

// 要创建BigInt，只需在整数的末尾追加n即可，9007199254740995n
// 或者 BigInt("9007199254740995")

Object.prototype.toString.call(1) // '[object Number]'
Object.prototype.toString.call('c') // '[object String]'
Object.prototype.toString.call({}) // '[object Object]'
Object.prototype.toString.call([]) // '[object Array]'
Object.prototype.toString.call(true) // '[object Boolean]'
Object.prototype.toString.call(() => {}) // '[object Function]'
Object.prototype.toString.call(null) // '[object Null]'
Object.prototype.toString.call(undefined) // '[object Undefined]'
Object.prototype.toString.call(Symbol('foo')) // '[object Symbol]'

// Object.prototype.toString.call是比较完美的判断类型的方法

// 注意: let s = new String('abc')也是一个对象
// 可以通过 Object.prototype.toString.call(s) === '[object String]' && typeof s === 'object' 来判断

// -----------------------------------------

// 除此之外还有 typeof, instanceof

// typeof 可以判断number, string, boolean, function, undefined, symbol
// 但在判断object类型的时候，无法精确的判断为哪一种object，null也为object
typeof null === 'object'
typeof new String('foo') === 'object'
typeof String('foo') === 'string'
// typeof原理： 不同的对象在底层都表示为二进制，在javascript中二进制前（低）三位存储其类型信息。
// 000: 对象
// 010: 浮点数
// 100：字符串
// 110： 布尔
// 1： 整数
// 而null的二进制表示全为0，故 typeof null === 'object'

// -----------------------------------------

// instanceof 可以用来判断一个对象的具体类型，但是也可能判断不准确，比如Array会被判断为Object
// a instanceof b是按照原型链向上搜索，只需要右边b.prototype在左边a的原型链上即可
;[1, 2, 3] instanceof Array === true
;[1, 2, 3] instanceof Object === true

function Foo() {}
Object instanceof Object // true
Function instanceof Function // true
Function instanceof Object // true
Foo instanceof Object // true
Foo instanceof Function // true
Foo instanceof Foo // false，Foo的__proto__为Function.prototype，故Foo的原型链式并没有Foo.prototype

let person = function () {}
let programmer = function () {}
programmer.prototype = new person()
let p1 = new programmer()
p1 instanceof person // true
p1 instanceof programmer // true
