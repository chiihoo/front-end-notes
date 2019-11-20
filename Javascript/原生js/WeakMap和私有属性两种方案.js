// 第一种：这是ES6时代实现私有属性的完美办法，但这里有个问题，如果是new Map()，
// var c = new C(); c = null 会使new出来的C()实例丢失指向，但是
// class A 由 var C指向，var C依然存在，所以class A不能被回收
// class A中用到了classProperties，所以classProperties这个Map不能被回收
// 而这classProperties这个Map中有this:_this，这个_this对象也就无法被回收，
// 由于每创建一个实例都会创建一个_this对象，当实例丢失指向后，_this对象无法被销毁，这就造成了内存泄漏。

// 解决方法是用WeakMap，WeakMap的键必须是对象类型，值可以是任意类型，并且如果仅被WeakMap内部指向，则这个WeakMap可以被垃圾回收。

// MDN:与Map对象不同的是，WeakMap的键是不可枚举的。不提供列出其键的方法。列表是否存在取决于垃圾回收器的状态，是不可预知的

var C = (function() {
  var classProperties = new WeakMap() // 弱引用，如果一个对象仅被WeakMap/WeakSet内部指向，则它可以被垃圾回收
  // var classProperties = new Map()
  return class A {
    constructor(name, age) {
      var _this = {}
      _this.name = name
      _this.age = age

      classProperties.set(this, _this)
    }
    getName() {
      var _this = classProperties.get(this)
      return _this.name
    }
    getAge() {
      var _this = classProperties.get(this)
      return _this.age
    }
  }
})()

var c = new C('ChihoSy', 25)
c = null

// 第二种：这种方法存在缺点，即创建不同实例时会创建大量重复的getName方法和getAge方法，大量占用内存
// function People(name, age) {
//   this.getName = function() {
//     return name
//   }
//   this.getAge = function() {
//     return age
//   }
// }
// var p1 = new People('ChihoSy', 23)
// var p2 = new People('ChihoSy', 23)
// p1.getName !== p2.getName
// p1.getAge !== p2.getAge
