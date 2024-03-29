|      | 类别                          | 原因短语                           |
| ---- | ----------------------------- | ---------------------------------- |
| 1xx  | Informational（信息性状态码） | 接受的请求正在处理                 |
| 2xx  | Success（成功状态码）         | 请求正常处理完毕                   |
| 3xx  | Redirection（重定向）         | 需要进行附加操作以完成请求         |
| 4xx  | Client error（客户端错误）    | 客户端请求出错，服务器无法处理请求 |
| 5xx  | Server Error（服务器错误）    | 服务器处理请求出错                 |


```
100 Continue
服务器已经接收到请求头，并且客户端应继续发送请求主体（在需要发送主体的请求的情况下：例如，POST请求），或者如果请求已经完成，忽略这个响应。
服务器必须在请求完成后向客户端发送一个最终响应。
要使服务器检查请求的头部，客户端必须在其初始请求中发送Expect: 100-continue作为头部，并在发送正文之前接收100 Continue状态代码。
响应代码417期望失败表示请求不应继续。
101 Switching Protocols：切换协议，WebSocket
```

```
200 OK: 客户端发送给服务器的请求被正常处理并返回
204 No Content: 请求被成功处理，但服务器并没有资源返回，一般用于只需要客户端向服务器发消息，且不需要返回信息时使用。
206 Patial Content: 表示客户端进行了范围请求，指仅对资源的某一部分进行请求。
```

```
301 Moved Permanently: 永久重定向，常用常见为使用域名跳转
	比如，访问 http://www.baidu.com 会跳转到 https://www.baidu.com
	可以缓存的，即通过看status code，可以发现后面写着from cache

302 Found: 临时重定向
	可用于 未登陆的用户访问重定向到登录页面；访问404页面会重新定向到首页。

303 See Other: 跟302状态码有相同的作用，但是明确表示客户端应当采用GET方法来重定向到另一个URI上去。

304 Not Modified: 客户端发送的请求会附带条件（是指采用GET方法的请求报文中包含if-Match、If-Modified-Since、If-None-Match、If-Range、If-Unmodified-Since中任一首部），比如说缓存方面的，如果服务器的资源没有发生更新，返回304状态码，告知客户端使用本地未过期的缓存。

307 Temporary Redirect: 临时重定向，跟302状态码一个意思，尽管302标准禁止POST变换成GET，但在实际使用时打架并不遵守。而307状态码会遵照浏览器标准，不会从POST变成GET。


301和302状态码都表示重定向，就是说浏览器在拿到服务器返回的这个状态码后会自动跳转到一个新的URL地址，这个地址可以从响应的Location首部中获取（用户看到的效果就是他输入的地址A瞬间变成了另一个地址B）——这是它们的共同点。他们的不同在于。301表示旧地址A的资源已经被永久地移除了（这个资源不可访问了），搜索引擎在抓取新内容的同时也将旧的网址交换为重定向之后的网址；302表示旧地址A的资源还在（仍然可以访问），这个重定向只是临时地从旧地址A跳转到地址B，搜索引擎会抓取新的内容而保存旧的网址。
```

```
400 Bad Request: 请求报文中存在语法错误
401	Unauthorized: 请求要求用户的身份认证
403	Forbidden: 服务器理解请求客户端的请求，但是拒绝执行此请求
404 Not Found: 请求的资源不存在
405	Method Not Allowed: 客户端请求中的方法被禁止
```

```
500 Internal Server Error: 内部服务器错误
```

