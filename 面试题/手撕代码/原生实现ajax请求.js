const xhr = new XMLHttpRequest()

xhr.onload = function () {
  if (xhr.status === 200) {
    console.log(xhr.responseText)
  } else {
    console.error(xhr.statusText)
  }
}

// GET请求
const url1 = 'www.test.com?name=张三&pwd=123' // 一般这个url需要拼接params
xhr.open('GET', url1, true) // 第三个参数代表是否异步
xhr.send(null)

// POST请求
const url2 = 'www.test.com'
xhr.open('POST', url2, true) // POST的第二个参数是不带请求实体的url,比如'www.test.com'
xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
xhr.send('name=张三&pwd=123')

// xhr.onreadystatechange = function () {
//   if (xhr.readyState === 4) {
//     if (xhr.status === 200) {
//       console.log(xhr.responseText)
//     } else {
//       console.error(xhr.statusText)
//     }
//   }
// }

// readyState状态
// 0: 请求未初始化
// 1: 服务器连接已建立
// 2: 请求已接收
// 3: 请求处理中
// 4: 请求已完成，且响应已就绪