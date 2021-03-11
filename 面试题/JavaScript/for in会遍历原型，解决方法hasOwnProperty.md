遍历一个对象的属性，怎么遍历，for in 有什么缺点，怎么解决
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



**for in会到对象的原型中寻找属性。**

**hasOwnProperty不会寻找原型链上继承的属性**

**Object.keys()也不会寻找原型链上继承的属性**



for in 的缺点就是 如果在实例的原型上加扩展方法，比如Object.prototype.test = 'aa'
之后声明一个对象实例b, var b = {'name':'foo'}
如果用for in遍历实例b, 会把这个test属性也给遍历出来

解决方法：使用Object.prototype.hasOwnProperty方法来判断遍历出来的不是原型上的属性
  不是原型链上的属性，true
  是原型链上的属性，false

  比如var foo = { bar:'baz'}
    foo.prototype.test = 'aa'
    foo.hasOwnProperty('bar')       // true
    foo.hasOwnProperty('toString')  // false
    foo.hasOwnProperty('test')      // false

  这个方法可以用来检测一个对象是否含有特定的自身属性；和 in 运算符不同，该方法会忽略掉那些从原型链上继承到的属性。


