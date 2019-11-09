function run(generatorFunc) {
  return new Promise((resolve, reject) => {
    var iterable = generatorFunc() //生成器
    var generated
    try {
      generated = iterable.next()
    } catch (e) {
      reject(e)
    }
    step()
    function step() {
      if (generated.done) {
        // 如果generated.value不是Promise，resolve(generated.value)这样写可以
        // 如果generated.value是个Promise，这样写不行，需要这样写generated.value.then(resolve,reject)
        // Promise.resolve()用于将现有对象转换为Promise对象，如果本来就是Promise对象，Promise.resolve()不会改动它
        // 所以可以写成以下形式 Promise.resolve(generated.value).then(resolve, reject)
        Promise.resolve(generated.value).then(resolve, reject)
      } else {
        generated.value.then(
          val => {
            try {
              generated = iterable.next(val)
            } catch (e) {
              reject(e)
            }
            step()
          },
          reason => {
            try {
              generated = iterable.throw(reason)
            } catch (e) {
              reject(e)
            }
            step()
          }
        )
      }
    }
  })
}

run(function* foo() {
  // getJSON()方法是jQuery封装的方法，使用 AJAX 的 HTTP GET 请求获取 JSON 数据
  var a = yield getJSON('/')
  console.log(a)
  var b = yield Promise.resolve(5)
  console.log(b)
})

// 等价于
async function foo() {
  var a = await getJSON('/')
  console.log(a)
  var b = await Promise.resolve(5)
  console.log(b)
}
