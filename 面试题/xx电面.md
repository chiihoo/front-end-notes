* 遍历一个对象的属性，怎么遍历，for in 有什么缺点，怎么解决
  1. **在原型上加扩展方法，会被for in 出来**
      Object.prototype.test = "I am test"
      var b = {"name":"txj"}
      for( var key in b ){
          alert(key + " : "+ b[key])
      }
    我们手动加在原型上的方法，for in的时候会被遍历出来。一般我们遍历对象并不需要其原型的属性，所以遍历时最好Object.prototype.hasOwnProperty方法进行判断。
  2. 在实例中定义原型中已有的方法，浏览器for in 情况不一致。  
      var b = {"name":"txj"}
      b.toString = function(){ alert("I am toString") }
      我们给b实例加了一个原型上已有的方法toString。现代浏览器能循环出toString 低版本浏览器却不能。所以给实例定属性名时，不要和原型已有的一致。
  3. for in循环出的值不一定是按顺序的
      var b = {3:1,42:2,11:3}
      for( var key in b ){
          alert( b[key] )
      }
    低版本浏览器弹窗的顺序是：1、2、3。现代浏览器弹窗的顺序是1、3、2。
  4. 各浏览器循环出的属性顺序不同
      现代浏览器先循环实例中的属性，再循环原型中的属性。低版本浏览器相反。

  
* call，apply，bind怎么用，有什么区别，bind之后的函数跟原函数有什么区别
* 对this的理解，箭头函数的this
* 判断数组类型有哪些方法，用instanceof 判断数组类型有什么缺点
* 说一下你对原型链的理解
  * 实例的__proto__等于它的构造函数的prototype属性
  * 用什么办法获取一个对象的原型，除了__proto__以外
    * Object.getPrototypeOf()
    * a.constructor.prototype
  * 原型链的最上面是啥？
    * null
  * Object.create()这个函数在干嘛？
    * 以传入的对象为原型创建一个对象
  * null有原型吗？
    * 没有

* ES6相关
  * let const 跟var有什么区别？
     * 变量提升的问题，let const 有变量提升吗？class有变量提升吗？可以不声明就使用吗？涉及到临时死区
     * 块级作用域的理解，我们怎么模拟一个块级作用域
     * 
  * promise怎么给下面的then传值
     * 突然发现自己不太会了。。。！！
     ```js
       Promise.resolve(5).then(res=>{
          return 5
        },rej=>{}).then(f1,f2)
     ```
     * promise视频再看一看
  * 用过proxy吗，用过ArrayBuffer吗
  * 用过Symbol吗，用过Symbol.for吗
  * 用过ES6新的数据结构吗

* 说一下XSS和CSRF，怎么防范
* 网络五层模型？TCP属于什么，IP属于什么，http属于什么？TLS属于什么
* 说一下https的验证方式
  * 我说了非对称加密交换对称加密的秘钥，用对称加密进行信息的交换，然后问我是不是交换秘钥之后一直都是用这个秘钥
  * 为啥不用非对称加密进行信息加密？我说性能不好，问我啥性能？为啥？
* 什么叫跨域，具体哪些东西不同才叫跨域？
  * 跨域怎么解决？
  * jsonp解决跨域有什么缺陷
  * cors，知道option请求吗，什么时候会有，在浏览器里面查看过吗
  * 为什么复杂请求就要先发一个option请求，具体是怎么通信的
  * 哪些叫复杂请求
* express 中间件机制，
* 用过原生node写东西吗？知道node的流吗？用过event-emitter吗
* Vue
  * 说一下响应式，Object.defineProperty的getter和setter分别做了啥
  * 用过slot吗
  * nextTick，什么时候需要用到它？这个没答好,确实没有深刻理解
  * vue3.0了解吗(我说我用的就是3.0啊 hhh 暴漏了)
* React
  * React 生命周期说一下，shouldComponentUpdate有什么用？ComponentWillReceiveProps用过吗
  * purecomponet 和component有什么区别
  * reset 用过吗？ref用过吗
  * react16有什么新特性

* 面试总结应该是十动然拒吧，觉得我学的还不错，学习方向没问题，聊的蛮愉快，但是框架不熟。