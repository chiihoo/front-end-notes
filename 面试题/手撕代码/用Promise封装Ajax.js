function ajax(options) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(options.type, options.url)
    xhr.send(null)
    // 从请求体发送数据。设置底下这个参数application/x-www-form-urlencoded，则发送的params是?a=1&b=2这种形式的数据。设置application/json，则发送JSON格式的数据
    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    // xhr.send(params)
    xhr.onload = function () {
      if (xhr.status === 200) {
        resolve(xhr.responseText)
      } else {
        reject()
      }
    }
    // xhr.onreadystatechange = function () {
    //   if (xhr.readyState === 4) {
    //     if (xhr.status === 200) {
    //       resolve(xhr.responseText)
    //     } else {
    //       reject()
    //     }
    //   }
    // }
  })
}
ajax({
  type: 'GET',
  url:
    'http://api.map.baidu.com/telematics/v3/weather?location=嘉兴&output=json&ak=5slgyqGDENN7Sy7pw29IUvrZ'
}).then(res => {
  console.log(res)
})
