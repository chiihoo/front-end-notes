// 向量
function Vector(x, y) {
  this.x = x
  this.y = y
}
//可枚举类型
Vector.prototype.plus = function(v) {
  var x = this.x + v.x
  var y = this.y + v.y
  return new Vector(x, y)
}

Vector.prototype.minus = function(v) {
  var x = this.x - v.x
  var y = this.y - v.y
  return new Vector(x, y)
}
//不可枚举类型
Object.defineProperty(Vector.prototype, 'length', {
  get: function() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }
})

// 或者
  function Vector(x, y) {
    this.x = x
    this.y = y
  }

  Vector.prototype = {
    plus(v) {

    },
    minus(v) {

    },
    get length() {

    }
  }




// 复数
function Complex(real, imag) {
  this.real = real
  this.imag = imag
}

Complex.fromStringComplex.fromString = function(str) {
  var real = xxxx //处理过程，省略了
  var imag = yyyy
  return new Complex(real, imag)
}
Complex.copy = function (c) {
  return new Complex(c.real, c.imag)
}
var c=new Complex(5,2)
var c1=Complex.copy(c)
// Complex.fromString和Complex.copy是挂载在构造函数上的方法，Complex()构造的实例c无法调用它们
//c.fromString()是错的！


Complex.prototype = {
  plus(c) {
    var real = this.real + c.real
    var imag = this.imag + c.imag
    return new Complex(real, imag)
  },
  minus(c) {
    var real = this.real - c.real
    var imag = this.imag - c.imag
    return new Complex(real, imag)
  },
  mul(c) {
    var real = this.real * c.real - this.imag * c.imag
    var imag = this.real * c.imag + this.imag * c.real
    return new Complex(real, imag)
  },
  division(c) {
    var factor = c.real * c.real + c.imag * c.imag
    var real = this.real * c.real + this.imag * c.imag
    var imag = this.imag * c.real - this.real * c.imag
    return new Complex(real / factor, imag / factor)
  },
  toString() {
    if (this.imag < 0) {
      return '' + this.real + this.imag + 'i'
    } else {
      return '' + this.real + '+' + this.imag + 'i'
    }
  }
}
