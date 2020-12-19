isNaN = is not a number

也就是判断一个值是否为非数字



```
isNaN(undefined)、isNaN()、isNaN('a')都为true，也就是 非数字
isNaN(null)、isNaN('')、isNaN(0)都为false，也就是 是数字

isNaN()的缺点就在于 null和空串 会被按照0来处理

isNaN(NaN)也为true
```

```
以下为判断一个值是否为数字的方法
function isNumber(obj) { 
  return typeof obj === 'number' && !isNaN(obj) 
}
由于typeof NaN === 'number', NaN 会被认为是number类型，因此我们需要使用isNaN来排除NaN的情况 
```

