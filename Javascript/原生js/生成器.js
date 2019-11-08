// // var obj={
// //     g:function*(){
// //         var index=0;
// //         while(true){
// //             yield index++;
// //         }
// //     }
// // }
// var obj = {
//   *g() {
//     var index = 0;
//     while (true) {
//       yield index++;
//     }
//   }
// }
// var it = obj.g();
// for (var i = 0; i < 10; i++) {
//   console.log(it.next().value);
// }

function* fibb(n) {
  let a = 0
  let b = 1
  while (n--) {
    yield a
    b = a + b
    a = b - a
  }
}
//把生成器的返回值全给输出
function spreadGenerator(generator) {
  var result = []
  var generated = generator.next()
  while (!generated.done) {
    result.push(generated.value)
    generated = generator.next()
  }
  return result
}
console.log(spreadGenerator(fibb(20)))

//或者这样写，这种更简便
function spreadGenerator(generator) {
  var result = []
  for (var val of generator) {
    result.push(val)
  }
  return result
}
console.log(spreadGenerator(fibb(20)))

// 可以实现这种形式：for(var i of 10){}
// Symbol.iterator，相当于迭代器的接口，只有对象里有这个symbol的属性，才可以认为此对象是可迭代的。
// 一个数据结构只要部署了Symbol.iterator属性就能使用 for...of遍历 与 ...运算符 操作
// Symbol的描述被存储在内部的[[Description]]属性中，只有当调用Symbol的toString()方法时才可以读取这个属性。

Number.prototype[Symbol.iterator] = function*() {
  for (var i = 1; i <= this; i++) {
    yield i
  }
}
for (var i of 10) {
  console.log(i)
}

//也可以这样实现
Number.prototype[Symbol.iterator] = function() {
  var i = 1
  return {
    next: () => {
      return {
        value: i++,
        done: i > this
      }
    }
  }
}
for (var i of 10) {
  console.log(i)
}

//TODO:在for之前增加代码以让for循环可以输出 9 1 2 3

// Number.prototype[Symbol.iterator] = function* () {
//   let n = this;
//   while (n) {
//     yield (n % 10);
//     n = Math.floor(n / 10);
//   }
// }
// for (var digit of 3219) {
//   console.log(digit)
// }

Number.prototype.digits = function*() {
  let n = this
  while (n) {
    yield n % 10
    n = Math.floor(n / 10)
  }
}
for (var digit of (3219).digits()) {
  console.log(digit)
}

// 作业：作生成器函数生成自然数列 素数序列
nature(n) //小于等于n的自然数
primes(n) //前n个素数

function* nature(n) {
  for (let i = 1; i <= n; i++) {
    yield i
  }
}
for (var i of nature(100)) {
  console.log(i)
}

function* prime(n) {
  for (let i = 0; i < n; i++) {
    if (isPrime(i)) {
      yield i
    }
  }
}
function isPrime(n) {
  if (n < 2) {
    return false
  }
  for (let i = 2; i < n; i++) {
    if (n % i == 0) {
      return false
    }
  }
  return true
}
for (var i of prime(100)) {
  console.log(i)
}
