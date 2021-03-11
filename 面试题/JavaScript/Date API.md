获取毫秒时间戳

```
let a = Date.now()
let b = new Date().getTime()
let c = new Date().valueOf()
let d = +new Date() // 如果 + 应用于对象之前，会首先调用找个对象的 valueOf() 和 toString()
let e = Date.parse(new Date())

console.log('a:', a)
console.log('b:', b)
console.log('c:', c)
console.log('d:', d)
console.log('e:', e)
```







```
new Date().getFullYear() // 年
new Date().getMonth() // 月，会比实际月份小1
new Date().getDate() // 日
new Date().getHours()
new Date().getMinutes()
new Date().getSeconds()
```

