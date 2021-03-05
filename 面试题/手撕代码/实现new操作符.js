// 构造函数和参数
function my_new(Func, ...args) {
  // 1. 创建一个新的对象
  const obj = {}
  // 2. 将对象与构造函数通过原型链绑定起来
  obj.__proto__ = Func.prototype
  // 将构造函数的this以及传进来的参数 绑定到新建的对象上
  let res = Func.call(obj, ...args)
  // // 最后判断结果是否为对象类型，并返回
  return res instanceof Object ? result : obj
}

// ————————————————————————————————————————————
function Person(name, age) {
  this.name = name
  this.age = age
}
Person.prototype.say = function () {
  console.log(this.name)
}

// let p = new Person('chiihooy', 25)
let p = my_new(Person, 'chiihooy', 25)
console.log(p)
p.say()
