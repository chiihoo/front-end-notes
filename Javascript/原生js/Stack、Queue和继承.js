//栈
function Stack() {
  this._top = null
  this._elementCount = 0
}
//在头结点处添加和删除
Stack.prototype = {
  pop() {
    if (this._top) {
      var node = this._top
      this._top = this._top.next
      this._elementCount--
      return node.val
    } else {
      return undefined
    }
  },
  push(val) {
    this._elementCount++
    var node = {
      val: val,
      next: this._top,
    }
    this._top = node
    return this
  },
  get size() {
    return this._elementCount
  }
}



//队列
// 头结点出,尾结点进（尾结点不能出，因为指针不能前移）
function Queue(initVals = []) {
  this._head = null
  this._tail = null
  for (var val of ary) {
    this.add(val)
  }
}

Queue.prototype = {
  add(val) {
    var node = {
      val: val,
      next: null,
    }
    if (this._head == null) {
      this._head = this._tail = node
    } else {
      this._tail.next = node
      this._tail = node
    }
    return this
  },
  remove() {
    if (!this._head) {
      return undefined
    }
    var node = this._head
    this._head = this._head.next
    if (this._head == null) {
      this._tail = null
    }
    return node.val
  }
}



// ES6新语法 使用了class
class Queue {
  static from(ary) {    // 直接挂载在Queue上的方法
    var q = new Queue()
    for (var val of ary) {
      q.add(val)
    }
    return q
  }

  constructor(initValues) { //Queue自己的构造函数   initValues传入的是数组
    this._head = null
    this._tail = null

    for (var val of initValues) {
      this.add(val)
    }
  }

  add(val) {    //Queue原型上的方法,默认会变成不可枚举的
    var node = {
      val: val,
      next: null,
    }
    if (this._head == null) {
      this._head = this._tail = node
    } else {
      this._tail.next = node
      this._tail = node
    }
    return this
  }

  remove() {
    if (!this._head) {
      return undefined
    }
    var node = this._head
    this._head = this._head.next
    if (this._head == null) {
      this._tail = null
    }
    return node.val
  }

  get size() {
    return this._size
  }
}


// 继承
class A { }
class B extends A { }
B.prototype.__proto__ === A.prototype
// => true
B.__proto__ === A
// => true

class A {
  static a() { }
  static b() { }
  constructor() { }
  method1() { }
  method2() { }
  get length() { }
  set length(val) { }
}
var a = new A() //必须通过new调用

