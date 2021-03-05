浏览器的同源策略限制：

​		允许跨域写操作，如重定向

​		允许跨域资源嵌入，如`img`、`script`标签

​		不允许跨域读操作

同源：如果两个页面拥有相同的**协议**protocol、**端口**port、**主机**host，则这两个页面就属于一个源origin

```
url:    http://www.foo.com
同源：    http://www.foo.com/bar.html
协议不同：https://www.foo.com
端口不同：http://www.foo.com:3000
主机不同：http://foo.com
```



实现跨域的方法：`JSONP`、`CORS`、`postMessage`、`Nginx`配置反向代理



1. **`JSONP`**

利用`script`标签没有跨域限制的“漏洞”来达到与第三方通讯的目的

**只支持`GET`请求**

需要前后端配合，前端预先定义一个回调函数，函数名称需要比较独特的，因为可能会有多个请求

```
function jsonp_callback_123xxx(data) {
	console.log(data)
}
```

其中参数data为传到后端要返回的数据。

通过请求`/api/user?id=123&name=foo&callback=jsonp_callback_123xxx`，将id、name以及callback回调函数的名称传递给后端，后端返回形如`jsonp_callback_123xxx({"result": "结果"})`的数据，这样前端页面会调用callback函数获取了后端的数据

`"Content-Type": "text/javascript;charset=utf-8"`返回的是`js`语句

```js
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
```



2. **`CORS`**

**组织语言：**

**`CORS`首先会将跨域请求分为简单请求和非简单请求，简单请求需要满足两个条件，一个是请求方式为`head,get,post`这三者之一，另一个是只能使用特定的几个字段。**

**如果是简单请求，那么浏览器会直接发送跨域请求给服务器，请求头会带上`Origin`字段，表示发起请求的源。服务器可以维护一个可被允许的源的列表，如果命中了，就在响应头上添加`Access-Control-Allow-Origin`字段**

**如果是非简单请求，那么会有一个预检环节(`Request Method: OPTIONS`请求)，浏览器发送一次`HTTP`查询请求，包括`Origin`、`Access-Control-Request-Method`和`Access-Control-Request-Headers`，表明跨域请求将使用的HTTP方法（get,post之类的）和请求头额外带上的字段。服务器收到请求后，检查字段，确认是否可以跨域，如果可以跨域，就会添加相应字段到响应头，比如`Access-Control-Allow-Origin`、`Access-Control-Allow-Methods`、`Access-Control-Allow-Headers`，还可以设置预检请求的有效期。如果不可以跨域，则不添加字段。一旦服务器通过预检请求，那之后每次浏览器的跨域请求就跟简单请求一样了。**



https://juejin.cn/post/6844903873400799240

浏览器会将`CORS`请求分为**简单请求**和**非简单请求**，两者的区别在于非简单请求会在正式通信之前，增加一次`HTTP`查询请求，又称”预检“，查询当前网页所在域名是否在服务器的许可名单中，以及可以使用哪些`HTTP`动词和头信息字段，只有得到肯定答复，浏览器才会发出正式的接口请求，否则报错。



**简单请求需要满足以下两个条件：**

1. 请求方式为`head`、`get`、`post`三者之一
2. 请求头不超过以下几种字段
   * `Accept`
   * `Accept-Language`
   * `Content-Language`
   * `Content-Type`只限于以下三个值
     * `application/x-www-form-urlencoded` 键值对
     * `multipart/form-data` 可以上传文件等二进制数据，也可以上传表单键值对
     * `text/plain`  纯文本，浏览器在获取到这种文件时并不会对其进行处理



**同时满足即为简单请求，否则即为非简单请求**



对于**简单请求**：

浏览器直接发出`CORS`请求，即在请求头中增加一个`Origin`字段，用来说明该请求来自哪个源（协议+域名+端口号），`Origin: http://127.0.0.1:3000`，

服务端可以维护一个可被允许的源的列表，如果命中了，就在响应头上添加`Access-Control-Allow-Origin`字段

```
简单请求响应头

// 必选
Access-Control-Allow-Origin: http://127.0.0.1:3000或者*  // *代表任何域名

// 可选
Access-Control-Allow-Credentials: true或不设置
// true表示允许发送cookie，此时Access-Control-Allow-Origin不能设置为*，必须指定明确的，与请求网页一致的域名

Access-Control-Expose-Headers
// 列出了哪些首部可以作为响应的一部分暴露给外部,包括如下七种
        Cache-Control
        Content-Language
        Content-Length
        Content-Type
        Expires
        Last-Modified
        Pragma
```



对于**非简单请求**：

在正式通信之前，会增加一次`HTTP`查询请求，又称”预检“，查询当前网页所在域名是否在服务器的许可名单中，以及可以使用哪些`HTTP`动词和头信息字段，只有得到肯定答复，浏览器才会发出正式的接口请求，否则报错。

预检请求会包括如下三个字段

```
预检请求头
Access-Control-Request-Headers: content-type, Expires  // 浏览器CORS请求会额外发送的头信息字段

Access-Control-Request-Method: POST  // 来列出浏览器的CORS请求会用到哪些HTTP方法

Origin: http://127.0.0.1:3000  // 该请求来自的源
```

服务器收到预检请求后，检查上述三个字段，确认了可以跨域，就会做出回应，添加`CORS`相关字段到响应头中。如果不允许跨域，则不会添加任何`CORS`相关字段，这是浏览器就会认定服务器不同意预检请求，并触发错误。

```
预检响应头

// 必选
Access-Control-Allow-Methods: GET,HEAD,PUT,POST,DELETE,PATCH // 服务器支持的所有跨域请求的方法
Access-Control-Allow-Origin: http://127.0.0.1:3000

Access-Control-Allow-Headers: content-type  // 服务器支持的所有头信息字段
// 如果浏览器请求头里包括Access-Control-Request-Headers字段，则Access-Control-Allow-Headers字段是必需的


Access-Control-Allow-Credentials：true或者不设置
// true表示允许发送cookie，此时Access-Control-Allow-Origin不能设置为*，必须指定明确的，与请求网页一致的域名

Access-Control-Allow-Max-Age
// 可选，用来指定本次预检请求的有效期。单位为秒。在有效期内，不用发出另一条预检请求
```



一旦预检通过，此后浏览器正常的`CORS`请求就都跟简单请求一样，发出去有`Origin`字段，回来时有`Access-Control-Allow-Origin`字段









