Function.prototype._bind = function (thisArg, ...args1) {
  // 用self存一下this
  let self = this
  return function (...args2) {
    self.call(thisArg, ...args1, ...args2)
  }

  // 底下的记不住
  // const bound = function (...args2) {
  //   self.call(this instanceof self ? this : thisArg, ...args1, ...args2)
  // }
  // bound.prototype = self.prototype
  // return bound
}

// call通过把给对象添加一个熟悉来吧
// let foo = {
//   value: 1,
//   bar: function () {
//     console.log(this.value)
//   }
// }
// foo.bar()
Function.prototype._call = function (thisArg, ...args) {
  // 如果是null或undefined，则thisArg=window。除此之外还有不是对象的情况，比如''
  thisArg = thisArg === null || thisArg === undefined ? window : Object(thisArg)
  // this指向的是调用_call方法的函数
  thisArg.fn = this
  thisArg.fn(...args)
  delete thisArg.fn
}

// apply只是将thisArg.fn(...args)换成了thisArg.fn(args)
Function.prototype._apply = function (thisArg, ...args) {
  thisArg = thisArg === null || thisArg === undefined ? window : Object(thisArg)
  thisArg.fn = this
  thisArg.fn(args)
  delete thisArg.fn
}
