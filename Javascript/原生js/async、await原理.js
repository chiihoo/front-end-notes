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
        // 如果generated.value是个Promise，resolve(generated.value)需要等里面Promise完成才能继续
        // 如果generated.value不是Promise，resolve(generated.value)就直接运行了
        // Promise.resolve()用于将现有对象转换为Promise对象，所以可以统一转成Promise对象
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
