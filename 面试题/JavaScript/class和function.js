// class类
class Person1 {
  constructor(value) {
    // 实例属性和实例方法，等同于函数里直接声明的this
    this.value = value
    this.f1 = () => {
      console.log(1, this)
    }
  }
  // 实例属性和实例方法
  // class fields语法，相当于把age和f3写到了constructor中，this.age = 23（没法接constructor传进来的参数）, this.f3 = function(){}
  age = 23
  f2 = () => {
    console.log(2, this)
  }

  // 原型方法，等同于函数里的P.prototype.f3，f3不会写到实例里面，没有显示的绑定this
  f3() {
    console.log(3, this)
  }
}
// 类方法，函数的类方法也是这样写的，需要通过类名或函数名直接调用
Person1.f4 = function () {
  console.log(4, this)
}

let p1 = new Person1(5) // 实例 Person1 {value: 5, age:23, f1: f, f2: f} 只有实例方法，没有原型方法

console.log(p1.value) // 5
p1.f1() // 1 p1
p1.f2() // 2 p1
p1.f3() // 3 p1
Person1.f4() // 4 Person1

let a = p1.f2
let b = p1.f3
a() // 2 p1
b() // 3 undefined 原型方法使用中间变量调用，会丢失原有this

// ————————————————————

// function函数
function Person2(value) {
  // 实例属性和实例方法，跟class里的this一样
  this.value = value
  this.f1 = () => {
    console.log(1, this)
  }
  // 调用f2时会先查找实例方法，找不到了就会到原型链逐层往上查找
  // this.f2 = () => {
  //   console.log('xxx')
  // }
}
// 原型方法，跟class里的f2(){}一样
Person2.prototype.f2 = function () {
  console.log(2, this)
}
// 类方法
Person2.f3 = function () {
  console.log(3, this)
}

let p2 = new Person2(5) // Person2 {value: 5, f1: f}

console.log(p2.value) // 5
p2.f1() // 1 p2
p2.f2() // 2 p2
Person2.f3() // 3 Person2

let a = p2.f1
let b = p2.f2
a() // 2 p2
b() // 3 Window 原型方法使用中间变量调用，会丢失原有this

// 注意
// Person2是构造函数，它构造了p2这样一个实例对象
// p2.__proto__ === Person2.prototype
// 当访问一个对象的属性和方法时，会查找这个对象的自身有没有该属性和方法，也就是实例方法
// 如果没有找到，就会去查找它的原型，__proto__指向的prototype原型对象
// 如果依然没有找到，就查找原型对象的原型
// 直到到达原型链的顶层null
// 如果都没找到，返回undefined
