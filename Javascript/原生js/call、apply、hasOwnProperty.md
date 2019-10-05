var obj={}
obj.a=8
此时 obj为
```
  {a: 8}
    a: 8
    __proto__:
    constructor: ƒ Object()
    hasOwnProperty: ƒ hasOwnProperty()
    isPrototypeOf: ƒ isPrototypeOf()
    propertyIsEnumerable: ƒ propertyIsEnumerable()
    toLocaleString: ƒ toLocaleString()
    toString: ƒ toString()
    valueOf: ƒ valueOf()
    __defineGetter__: ƒ __defineGetter__()
    __defineSetter__: ƒ __defineSetter__()
    __lookupGetter__: ƒ __lookupGetter__()
    __lookupSetter__: ƒ __lookupSetter__()
    get __proto__: ƒ __proto__()
    set __proto__: ƒ __proto__()
```
  浏览器中除了a的这些属性都是暗色的，代表不可枚举类型,
  而a是枚举类型，是亮色的


for...in语句以任意顺序遍历一个对象自有的、继承的、可枚举的、非Symbol的属性。对于每个不同的属性，语句都会被执行。而in操作符可以测试对象是否包含对应的属性。
**这种方式会到对象的原型中寻找属性。**

所有继承了 Object 的对象都会继承到 hasOwnProperty 方法。这个方法可以用来检测一个对象是否含有特定的自身属性；和 in 运算符不同，该方法会忽略掉那些从原型链上继承到的属性。
**hasOwnProperty不会寻找原型链上继承的属性**


* 不可枚举类型不会被hasOwnProperty()获取，会返回false
  ```
  obj.hasOwnProperty('toString')
  =>  false
  ```
* 枚举类型会被hasOwnProperty()获取，会返回true
  ```
  obj.hasOwnProperty('a')
  =>  true
  ```

JavaScript 并没有保护 hasOwnProperty 属性名，因此某个对象是有可能存在使用这个属性名的，
也就是说对象的hasOwnProperty是可能被修改的
比如  obj.hasOwnProperty=5;
这样obj.hasOwnProperty('a')就会报错，怎么解决呢

**方法一**
```
Object.prototype.hasOwnProperty.call(obj,'a')
```

这个意思是Object.prototype.hasOwnProperty的this指向obj,参数传入'a',
即obj调用了Object原型上的hasOwnProperty方法，参数为'a'

也可以写成
```
Object.prototype.hasOwnProperty.apply(obj,['a'])
```
**apply的作用和call一样，但第二个参数必须为数组**

**方法二**
```
({}).hasOwnProperty.call(foo, 'bar')
```
意思是使用另一个对象的hasOwnProperty方法



---

为了判断对象自身是否包含某个属性，而不会搜索其原型，可以这样做
```
for(var key in obj){
  if(obj.hasOwnProperty(key)){
    return true;
  }
}
```
但是，由于hasOwnProperty可能会被修改，可以这样改进
```
for(var key in obj){
  if(Object.prototype.hasOwnProperty.call(obj,key)){
    return true;
  }
}
```




