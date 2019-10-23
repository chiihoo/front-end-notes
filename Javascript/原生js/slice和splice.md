slice(i,j)
可用于：数组、字符串
不改变原数组(字符串)，返回新数组(字符串)，包含下标i到下标j(不含j)的数组元素(字符串)。
```
var arr=[1,2,3,4,5]
console.log(arr.slice(1))   // [2,3,4,5]  返回了一个新数组
console.log(arr.slice(1,3)) // [2,3]
console.log(arr)            // [1,2,3,4,5]  未改变原数组
```

---

splice(i,j,item)
可用于：数组
会改变原数组，返回新数组，删除从下标i开始数到第j个的所有元素，并在删除位置插入item元素。
```
var arr=[1,2,3,4,5]
console.log(arr.splice(2,1,'hello'))  //[3]   返回一个新数组
console.log(arr)                      //[1,2,'hello',4,5]   改变了原数组
```

---

substring(i,j)
与slice类似，但只用于字符串
可用于：字符串
不改变原字符串，返回新字符串，包含下标i到下标j(不含j)的数组元素(字符串)。

---

substr(i,j)
与splice类似，但只用于字符串
可用于：字符串
不改变原字符串，返回新字符串，包含从下标i开始数到第j个字符的字符串。


