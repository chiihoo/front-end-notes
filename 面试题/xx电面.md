- 遍历一个对象的属性，怎么遍历，for in 有什么缺点，怎么解决

  1. **在原型上加扩展方法，会被 for in 出来**
     Object.prototype.test = "I am test"
     var b = {"name":"txj"}
     for( var key in b ){
     alert(key + " : "+ b[key])
     }
     我们手动加在原型上的方法，for in 的时候会被遍历出来。一般我们遍历对象并不需要其原型的属性，所以遍历时最好 Object.prototype.hasOwnProperty 方法进行判断。
  2. 在实例中定义原型中已有的方法，浏览器 for in 情况不一致。
     var b = {"name":"txj"}
     b.toString = function(){ alert("I am toString") }
     我们给 b 实例加了一个原型上已有的方法 toString。现代浏览器能循环出 toString 低版本浏览器却不能。所以给实例定属性名时，不要和原型已有的一致。
  3. for in 循环出的值不一定是按顺序的
     var b = {3:1,42:2,11:3}
     for( var key in b ){
     alert( b[key] )
     }
     低版本浏览器弹窗的顺序是：1、2、3。现代浏览器弹窗的顺序是 1、3、2。
  4. 各浏览器循环出的属性顺序不同
     现代浏览器先循环实例中的属性，再循环原型中的属性。低版本浏览器相反。

- call，apply，bind 怎么用，有什么区别，bind 之后的函数跟原函数有什么区别

  call 和 apply 的作用是改变函数内部的 this 指向，第一个参数都是 this 的值，不同的是 apply 的第二个参数是一个数组，数组的各项为传入函数的实参，而 call 不是传一个数组，它是把每个实参依次写到第二个参数、第三个参数依次类推。
  而 bind 也可以改变函数内部的 this，不同的是，它会生成一个新的绑定函数，并且可以预设该函数部分形参的默认值
  function f (arg1, arg2, arg3) {}
  f.call(null, ...Arr)
  f.apply(null, Arr)
  const f2 = f.bind(null, 5)
  这样 f2(arg1 = 5, arg2, arg3) {}

- 对 this 的理解，箭头函数的 this

  this 指向的是调用它的对象实例
  全局环境下调用的 this 指向 window
  非严格模式下，函数中直接使用 this，this 指向 window，严格模式下，this 指向 undefined

  setTimeout 是挂在 window 对象上的，当中所执行的延时函数中的 this，指向 window。除非该函数为箭头函数，或者使用闭包 用 self 保存 this
  箭头函数在自己的作用域内没有 this，它的 this 指向定义时所在作用域的 this

- 判断数组类型有哪些方法，用 instanceof 判断数组类型有什么缺点
- 说一下你对原型链的理解

  - 实例的**proto**等于它的构造函数的 prototype 属性
  - 用什么办法获取一个对象的原型，除了**proto**以外
    - Object.getPrototypeOf()
    - a.constructor.prototype
  - 原型链的最上面是啥？
    - null
  - Object.create()这个函数在干嘛？
    - 以传入的对象为原型创建一个对象
  - null 有原型吗？
    - 没有

- ES6 相关

  - let const 跟 var 有什么区别？
    - 变量提升的问题，let const 有变量提升吗？class 有变量提升吗？可以不声明就使用吗？涉及到临时死区
    - 块级作用域的理解，我们怎么模拟一个块级作用域
    -
  - promise 怎么给下面的 then 传值
    - 突然发现自己不太会了。。。！！
    ```js
    Promise.resolve(5)
      .then(
        res => {
          return 5
        },
        rej => {}
      )
      .then(f1, f2)
    ```
    - promise 视频再看一看
  - 用过 proxy 吗，用过 ArrayBuffer 吗
  - 用过 Symbol 吗，用过 Symbol.for 吗
  - 用过 ES6 新的数据结构吗

- 说一下 XSS 和 CSRF，怎么防范
- 网络五层模型？TCP 属于什么，IP 属于什么，http 属于什么？TLS 属于什么
- 说一下 https 的验证方式
  - 我说了非对称加密交换对称加密的秘钥，用对称加密进行信息的交换，然后问我是不是交换秘钥之后一直都是用这个秘钥
  - 为啥不用非对称加密进行信息加密？我说性能不好，问我啥性能？为啥？
- 什么叫跨域，具体哪些东西不同才叫跨域？
  - 跨域怎么解决？
  - jsonp 解决跨域有什么缺陷
  - cors，知道 option 请求吗，什么时候会有，在浏览器里面查看过吗
  - 为什么复杂请求就要先发一个 option 请求，具体是怎么通信的
  - 哪些叫复杂请求
- express 中间件机制，
- 用过原生 node 写东西吗？知道 node 的流吗？用过 event-emitter 吗
- Vue
  - 说一下响应式，Object.defineProperty 的 getter 和 setter 分别做了啥
  - 用过 slot 吗
  - nextTick，什么时候需要用到它？这个没答好,确实没有深刻理解
  - vue3.0 了解吗(我说我用的就是 3.0 啊 hhh 暴漏了)
- React

  - React 生命周期说一下，shouldComponentUpdate 有什么用？ComponentWillReceiveProps 用过吗
  - purecomponet 和 component 有什么区别
  - reset 用过吗？ref 用过吗
  - react16 有什么新特性

- 面试总结应该是十动然拒吧，觉得我学的还不错，学习方向没问题，聊的蛮愉快，但是框架不熟。
