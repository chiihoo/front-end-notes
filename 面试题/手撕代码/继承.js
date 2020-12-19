// 以下都是A继承B

// 1.原型链继承：将A.prototype挂载为父类B的一个实例
// 优点：可以继承父类原型上的属性和方法
// 缺点：
// 1.原型中包含的引用值会在所有实例间共享，如果a1.arr.push(5)，会导致a2.arr也发生变化
// 2.子类型在实例化的时候不能给父类型的构造函数传参
A.prototype = new B()

// 2.构造函数继承：在子类构造函数中调用父类构造函数
// 在子类A中用call,apply,bind调用，通过改变this的指向，并且调用B。相当于在新的A对象上运行了B()函数中所有的初始化代码
// 优点：可以给父类型构造函数传参
// 缺点：但是只能继承父类构造函数上的属性和方法，不能继承父类原型上的属性和方法
function A(name) {
  B.call(this, name)
  // B.apply(this, [name])
  // B.bind(this, name)()
}

// 3.组合继承：融合了以上原型链继承和构造函数继承
// 优点：解决了上述的两项的缺点，由于new B()每次都是一个新对象，因此实例间不会共享原型中的引用值，并且也可以继承父类原型上属性和方法，
// 缺点：但是由于两次调用了B，导致构造函数中的属性和函数会生成两份，一份在子类上，一份在子类的原型上
// 当使用delete删除属性的时候，尽管将子类本身的属性删除了，但会从原型链上查找同名属性使用，所以没删干净
function A(name) {
  B.call(this, name)
}
A.prototype = new B()

// 4.寄生组合继承：主要的差别就在于把new B()换成了Object.create(B.prototype)
// Object.create(B.prototype)相当于创建了一个原型为B.prototype的新对象，每次都创建新的中间对象
// 一方面实例间不会共享原型中的引用值，另一方面由于只调用一次new B()，因此B中的属性和方法只会生成一份在子类A上
function A(name) {
  B.call(this, name)
}
A.prototype = Object.create(B.prototype)
A.prototype.constructor = A

// 5.ES6 类class extends继承





// 以下是详细的例子






// ————————————————————————————————————————
// 1.原型链继承
// 将A.prototype挂载为父类B的一个实例

function B() {
  this.nameB = 'B'
  this.arr = [1, 2, 3]
}
B.prototype.nameProto = 'PROTO'

function A() {
  this.nameA = 'A'
}
A.prototype = new B()

let a1 = new A() // B {nameB: "B"}
let a2 = new A()

a1.arr // [1, 2, 3]
a2.arr // [1, 2, 3]

a1.arr.push(5)

a1.arr // [1, 2, 3, 5]
a2.arr // [1, 2, 3, 5]

// 优点：可以继承原型链的属性
// 缺点：1.原型中包含的引用值会在所有实例间共享，如上所示a1.arr.push(5)，导致了a2.arr也发生了变化
//      2.子类型在实例化的时候不能给父类型的构造函数传参

// ————————————————————————————————————————
// 2.构造函数继承
// 通过改变this指向的方式(call/apply/bind)执行一次构造函数B，注意bind由于返回的是一个函数，需要B.bind(this, 'B')()
// 让父类里面的this指到子类的上下文，这样在父类里面通过this设置的属性或者方法会被写到子类上面

function B(name) {
  this.nameB = name
}
B.prototype.nameProto = 'PROTO'

function A() {
  B.call(this, 'B')
  this.nameA = 'A'
}

let a = new A()

// a的打印结果中，nameB和nameA在同一层级

// 优点：可以在子类构造函数中向父类构造函数传参
// 缺点：只能继承父类构造函数上的属性和方法，不能继承父类原型上的属性和方法。

// ————————————————————————————————————————
// 3.组合继承

function B() {
  this.nameB = 'B'
}
B.prototype.nameProto = 'PROTO'

function A() {
  B.call(this)
  this.nameA = 'A'
}
A.prototype = new B()

let a = new A()

// 组合继承就是前两个原型链继承和构造函数继承的结合

// 优点：可以继承原型链的属性，可以在子类构造函数中向父类构造函数传参
// 缺点：nameB属性有两个，一个在子类自身上，一个在子类的原型上。这是由于两次调用了B构造函数的结果

// ————————————————————————————————————————
// 4.寄生组合继承
// 通过Object.create实现继承
// 通过Object.create函数创建中间对象，把两个对象区分开

function B() {
  this.nameB = 'B'
}
B.prototype.nameProto = 'PROTO'

function A() {
  B.call(this)
  this.nameA = 'A'
}
A.prototype = Object.create(B.prototype) // 区别在这，组合继承是 new B()
A.prototype.constructor = A // 修正constructor，它主要防止一种情况下出错，就是显式地去使用构造函数，
// 比如let a = new A()，我想克隆一个，但我并不知道a是由哪个构造函数实例化的，所以我用了这个let a1 = a.constructor()

// Object.create(B.prototype)返回一个以B.prototype为原型的对象，而不用执行B方法

let a = new A()

// 优点：实现了继承，实现了父子类隔离

// 同时继承多个对象
// function A() {
//   B1.call(this)
//   B2.call(this)
//   this.nameA = 'A'
// }
// A.prototype = Object.assign(A.prototype, B1.prototype, B2.prototype)
// A.prototype.constructor = A

// ————————————————————————————————————————
// 5.ES6是哪种继承？Babel降级到ES5又是哪种继承？
// ES6的继承是类继承 class extends，Babel降级到ES5应该是寄生组合继承

// class里面不能直接给原型上定义属性，但是可以定义原型上的函数
class B {
  constructor(name) {
    this.nameB = name
    this.nameB1 = 'B1'
  }
  // nameB1 = 'B' // 跟写在constructor中this.nameB1 = 'B'一个效果
  func1() {
    console.log('这个方法是定义在原型上的')
  }
}

// 可以在class外面定义原型上的属性
B.prototype.p = 'PROTO_B'

class A extends B {
  constructor(nameB, nameA) {
    super(nameB)
    this.nameA = nameA
  }
}
A.prototype.p = 'PROTO_A'

let a = new A('B', 'A')
a.func1()
