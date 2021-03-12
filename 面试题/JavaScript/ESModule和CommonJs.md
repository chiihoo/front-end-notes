```js
import {} from 'foo'
export * from 'foo'

const x = 1
const y = 2
export {x, y}
export default function () {}

// ES2020可以动态导入import
window.onclick = () => {
  import('/modules/my-module.js')
    .then(module => {
      // Do something with the module.
    })
    .catch(err => {
      // load error;
    })
}

let {x} = await import('/test')
```





```js
// index.js
module.exports.name = 'foo'
module.exports.age = 25

let data = require('./index.js')
console.log(data) 	// { name: 'foo', age: 25 }


// 导出也可以省略module关键字，直接写exports导出也可以
// 如果使用exports导出单个值之后，就不能在导出一个对象值，这会修改当前导出的引用，然而之前的导出就会被覆盖。
exports.name = "foo"
exports.sex = "male"
exports = {
    name: "bar"
}
// 上面example中，这种情况会改变对象的引用值，所以最后导出的只是一个对象。
```



**CommonJs导出的值是拷贝，可以被修改**

```js
// index.js
let num = 0;
module.exports = {
    num,
    add() {
       ++num 
    }
}

// foo.js
let { num, add } = require("./index.js")
console.log(num) // 0
add()
console.log(num) // 0

num = 5
```

