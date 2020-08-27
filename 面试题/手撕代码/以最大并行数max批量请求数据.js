// 已经存在loadUrl函数，返回一个Promise对象，值是返回url的响应结果

// urls是数组，max表示最大并行连接数，callback回调函数

urls = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]

const loadUrl = url => {
  // return Promise.resolve('promise+' + url)
  return new Promise((resolve, reject) => {
    console.log(url + ' 正在请求')
    if (url == 2) {
      setTimeout(() => {
        resolve('promise+' + url)
      }, 5000)
    } else {
      setTimeout(() => {
        resolve('promise+' + url)
      }, 3000)
    }
    // setTimeout(() => {
    //   resolve('promise+' + url)
    // }, 3000)
  })
}

// 第一种 密集型并发（推荐）
const loadUrls = (urls, max, callback) => {
  let i = 0 // 已发出请求的索引
  let count = 0 // 已完成请求的索引
  let res = []
  function send() {
    // 有请求，有通道
    while (i < urls.length && max > 0) {
      max-- // 占用通道
      loadUrl(urls[i++]).then(result => {
        max++ // 释放通道
        count++ // count是用来判断请求是否全部完成的，不能用i来判断，因为i是只要发出了请求，不管完成与否，都会+1
        res.push(result) // 注意这里的顺序不是按照执行顺序来的，具体怎样映射，我还没搞清，具体要参考一下Promise.all的实现
        // console.log(i, count, res)
        if (count === urls.length) {
          callback(res)
        } else {
          send() // 在一个请求完成后，需要手动调用send，如果上述while语句不是写在send函数中，max到达0后，就不会继续执行了
        }
      })
    }
  }
  send()
}

// ————————————————————————————————————————

// 第二种是先分段，用Promise.all()，max个执行完，才开始下一个max
// 若max=5, [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, 15], [16, 17, 18, 19, 20],[21, 22]]
const getUrlsGroups = (urls, max) => {
  let urlsGroups = []
  urls.forEach((item, index) => {
    // 当前下标为index的数为第几个max组
    let currentIndex = parseInt(index / max)
    if (!urlsGroups[currentIndex]) {
      urlsGroups[currentIndex] = [item]
    } else {
      urlsGroups[currentIndex].push(item)
    }
  })
  return urlsGroups
}
const loadUrls1 = (urls, max, callback) => {
  let urlsGroups = getUrlsGroups(urls, max)
  let currentIndex = 0
  let res = []
  function send() {
    if (currentIndex < urlsGroups.length) {
      let urlsPromises = urlsGroups[currentIndex].map(url => {
        return loadUrl(url)
      })
      Promise.all(urlsPromises).then(results => {
        currentIndex++
        res = res.concat(results)
        console.log(`第${currentIndex}次调用`)
        console.log(res)
        send()
      })
    } else {
      console.log('结束调用')
      callback(res)
    }
  }
  send()
}

// 必须引入callback，不然是拿不到值的
let result
loadUrls(urls, 5, res => {
  result = res
  console.log('result', result)
})
// loadUrls1(urls, 5, res => {
//   result = res
//   console.log('result', result)
// })
