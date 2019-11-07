// jsonp,即JSON with padding,也就是json数据填充

// 大概操作：创建一个回调函数，然后在远程服务上调用这个函数并且将JSON 数据形式作为参数传递，完成回调
// 平常的jsonp操作应该是
// var script = document.createElement('script')
// script.src = 'https://api.asilu.com/ip/?ip=www.baidu.com&callback=JSONP_CALLBACK_15725227174571a84f29c83d8a'
// document.head.appendChild(script)
// 需要在前端预先定义 JSONP_CALLBACK_15725227174571a84f29c83d8a这个方法function
// 后台拿到ip的请求参数和callback值后，以  callback值+'('+返回结果+')' 的方式 返回客户端
// 即在页面调用了 JSONP_CALLBACK_15725227174571a84f29c83d8a(返回结果) 这个方法

// 写成函数，由于同一页面可能会访问很多jsonp接口,因此callback名字需不同
// 前端定义了一个callbackName为一个唯一的随机数，比如JSONP_CALLBACK_15725227174571a84f29c83d8a，并且给这个名字定义了一个处理返回结果的函数
// 后台（.NET?）的操作是
// string callback=Request.QueryString["callback"];   //获取callback=后面跟着的callbackName,比如JSONP_CALLBACK_15725227174571a84f29c83d8a
// Response.Write(callback+"({result:'这是返回的结果'})");  // 向客户端写入内容，返回一个函数调用 JSONP_CALLBACK_15725227174571a84f29c83d8a({result:'这是返回的结果'})
// 这样，就把返回结果以函数参数的方式返回了客户端，同时调用了JSONP_CALLBACK_15725227174571a84f29c83d8a方法

// 为什么要以函数参数的形式传递数据？
// 传递数据一定要是可执行的JS代码，要么返回var foo = {a:5}，要么返回 foo({a:5})。总之返回{a:5}肯定是不对的。
// 如果是以变量的形式,例如Response.Write(var foo = {a:5}); 如果原来页面也有个foo变量，就会覆盖数据
// 用回调函数的形式，避免了这个问题，也可以异步调用

// jsonp('https://api.asilu.com/ip/', {
//   id: 'foo',
//   since: 1996,
// })
// 需要把传进去的参数data序列化成以下格式，当然这个接口是传的参数不是这个，只是测试
// https://api.asilu.com/ip/?id=foo&since=1996&callback=xxxxx

function jsonp(url, data) {
  return new Promise((resolve, reject) => {
    var script = document.createElement('script')
    // 由于同一时间有很多callback，需要给callback取一个独特唯一的名字
    var callbackName = 'JSONP_CALLBACK_' + Date.now() + Math.random().toString(16).slice(2)
    // Object.entries(data)会把对象转化为[["id", "foo"],["since", 1996]]
    url = url + '?' + Object.entries(data).map(pair => {
      return pair.join('=')
    }).join('&') + '&callback=' + callbackName

    // callbackName是一个变量，不能写成window.callbackName
    window[callbackName] = function (data) {
      delete window[callbackName]
      document.head.removeChild(script)
      resolve(data)
    }
    script.onerror = function (e) {
      delete window.callbackName
      document.head.removeChild(script)
      reject(e)
    }

    script.src = url
    document.head.appendChild(script)
  })
}
var testData = await jsonp('https://api.asilu.com/ip/',{ip:"www.baidu.com"})
console.log(testData)
//不能在chrome的Infinity打开


