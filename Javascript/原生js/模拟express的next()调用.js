app.use((req, res, next) => {
  xxxx
  next()
})
app.use((req, res, next) => {
  xxxx
  next()
})
app.use((req, res, next) => {
  xxxx
  next()
})
app.use((req, res, next) => {
  xxxx
  next()
})

// 模拟
var fns = [
  next => {
    console.log(1)
    setTimeout(next, 1000)
  },
  next => {
    console.log(2)
    setTimeout(next, 1000)
  },
  next => {
    console.log(3)
    setTimeout(next, 1000)
  },
  next => {
    console.log(4)
    setTimeout(next, 1000)
  }
]
var compose1 = fns.reduceRight((prev, f) => {
    return function next1() {
      f(prev)
    }
  },() => {})
compose1()
// 从后往前reduce,因为最后一个next()为空函数，所以初始值为() => {}

// 没搞太明白，这个知识点也不重要

// 带参数的
function compose(fns) {
  return fns.reduceRight((prev, f) => {
      return function(req, res) {
        f(req, res, () => {
          prev(req, res)
        })
      }
    },() => {})
}
