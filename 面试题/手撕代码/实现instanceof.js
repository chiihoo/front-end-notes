// object instanceof constructor 左侧是一个实例对象，右侧是一个构造函数constructor
// 它的原理是向上搜索左侧实例对象的原型链，看右侧构造函数的prototype是否出现在原型链上，等同于constructor.prototype.isPrototypeOf(object)
function _instanceof(L, R) {
  while (true) {
    if (L.__proto__ === null) {
      // 查找原型链到顶了
      return false
    }
    console.log(L.__proto__, R.prototype, L.__proto__ === R.prototype)
    if (L.__proto__ === R.prototype) {
      // 找到了
      return true
    }
    L = L.__proto__
  }
}
