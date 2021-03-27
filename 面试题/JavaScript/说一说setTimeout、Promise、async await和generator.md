setTimeout它是一个定时器，它会通过一个定时器线程进行计时，计时完毕后将需要执行的函数放到宏任务里面，等待执行。它的最小时延是4ms，它的参数如果不是箭头函数的话，this是默认指向window的。



Promise是实现异步的一种方式，它有三种状态，`pending`，`fullfilled`，`rejected`，调用`resolve`或`reject`方法会将`pending`状态变为`fullfilled`或者`rejected`，一旦变化就无法再更改。`Promise`维护了两个队列，`resolvedQueue`和`rejectedQueue`，当状态为`pending`时，`Promise.prototype.then`会返回一个新的`Promise`，并且会将传给then的两个函数参数做一层包装，放进这两个队列里面，当状态改变时，依次执行。



这层包装就是执行传给它的函数，如果结果也是`Promise`类型的话，就用这个结果接着`then`，否则直接`resolve`





generator是生成器，用function *号和yield来定义，可以通过调用next来一步一步的执行

```js

function* fib(max) {
  var t,
    a = 0,
    b = 1,
    n = 0
  while (n < max) {
    yield a
    ;[a, b] = [b, a + b]
    n++
  }
  return
}

var f = fib(5)
f.next() // {value: 0, done: false}
f.next() // {value: 1, done: false}
f.next() // {value: 1, done: false}
f.next() // {value: 2, done: false}
f.next() // {value: 3, done: false}
f.next() // {value: undefined, done: true}
```





`async、await`是`Promise`和`generator`的一个语法糖

它会自动返回一个`Promise`对象，并且只能用`try catch`来截获错误

它的执行时串行的，只有一个`await`执行完后，才会执行下一个`await`