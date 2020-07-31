- **Cookie**
  cookie 默认是无法跨域的，但是一级域名和二级域名之间是可以共享的（domain）
  
  cookie是存储在客户端的， cookie 是服务器发送到用户浏览器并保存在本地的一小块数据，它会在浏览器下次向同一服务器再发起请求时被携带并发送到服务器上
  
  

|      属性       |                             说明                             |
| :-------------: | :----------------------------------------------------------: |
|      Name       |                   cookie 的名称，为字符串                    |
|      Value      |                      对应的值，为字符串                      |
|     Domain      |             指定 cookie 所属域名，默认为当前域名             |
|      Path       | 可以访问该cookie的页面路径，默认为'/'，如果设置为/a/b，那么当访问/a/b/下的路径时，请求头会包含该 cookie，而访问/a/时，请求头不会带上该 cookie |
| Expires/Max-Age | 字段为cookie超时时间。不设置的话默认值为Session，意思为cookie会和session一起失效。Expires = Max-Age + 请求时间。Expires指的是过期时间，在某个时间点后cookie失效。而Max-Age指的是再过Max-Age秒cookie失效，是一个时间段，如果为负数，则为临时cookie，关闭浏览器就会失效，如果为0，则删除该cookie，默认为-1 |
|      Size       | 总大小在4097个字节左右，大约4kb，chrome限制每个域的cookie个数为53个，其余浏览器各不相同 |
|    HttpOnly     | boolean类型，如果为true，则只能在http请求头中带有该cookie的信息，无法通过客户端的js脚本document.cookie读取该cookie的信息，但是还是可以在控制台Application栏目手动修改，所以只能在一定程度上防范XSS攻击 |
|     Secure      | boolean类型，如果为true，则该cookie只在https协议中有效，在http协议中无效 |
|    SameSite     | 可选Strict、Lax、None。Strict完全禁止第三方cookie，只有当前网页的 URL 与请求目标一致，才会带上 cookie。Lax限制稍稍放宽，大多数情况不发送第三方cookie，除了导航到目标网址的get请求除外，包括超链接<a href='...'/>，预加载<link rel="prerender" />和get表单<form method="GET" />三种形式发送cookie。None可以显示的关闭SameSite，但是必须搭配Secure使用，也就是cookie必须通过https协议发送，否则无效。Chrome51版本新增SameSite属性，80版本默认设置SameSite：Lax。 |
|    Priority     | 优先级，Low/Medium/High，当cookie数量超出时，低优先级的cookie会被优先清除 |



XSS跨站脚本攻击：指的是攻击者通过在web页面嵌入恶意代码，当用户在打开网页后，恶意代码会自动执行。

比如可以插入一串js代码，用document.cookie来窃取用户的cookie，将cookie的HttpOnly属性设置成true，可以一定程度防范。



* **Session**

  session是存储在服务端的，它是基于cookie实现的

  sessionId会存储在客户端的cookie中

  **session认证流程**：

  * 用户第一次向服务端发起请求，服务端根据用户提交的信息，创建对应session，并将该session的唯一标识信息sessionId返回给浏览器

  * 浏览器接收到服务器返回的sessionId时，会将此信息存到cookie中，同时会记录该sessionId属于哪一个域名

  * 当用户第二次访问服务器时，会带上cookie，服务端会从cookie中拿到sessionId，并根据sessionId查找对应的session信息，如果找到session，则说明用户已经登录，否则用户未登录或登录失效。

     

* **Cookie和Session的区别**
  
  * cookie是存储在客户端的，session是存储在服务端的，session更安全。
  
  * cookie只支持存储字符串类型，session可以存储各种数据类型。

  * cookie总共最多只能保存4k大小的数据，session的容量远大于cookie，但是访问量过大时会占用服务器资源。
  
  * cookie可以设置长时间保持，而session的存活时间较短，可以设置最多不超过24h？根据语言的不同，可能有差异。
  
    
  
* **Token 令牌**

  token是访问需要权限的资源接口所需要的凭证

  鉴权信息会存储到token中，token保存在客户端本地的localStorage0中，也可以保存在cookie中，服务端只需要对发送过来的token值进行验证即可，普通的token应该是会存到redis数据库中，要查询数据库进行校验？而JWT不需要存储token，可以直接用密钥解密进行校验。

  * 在登录成功时，服务端会提供给客户端一串token，客户端收到token后会保存在localStorage中，客户端每次向服务端发起请求时，需要手动携带这串token，将token放到HTTP的header中，之后服务端会校验token，如果成功则返回数据。

  * token和cookie的区别在于，每次通信都会自动带上cookie，而token需要手动携带。

  还有一种token是refresh token，专门用于对access token的过期时间进行续期。

  token存储在数据库中的痛点在于，服务器集群间共享token，如果是多台机器都存token，怎么同步，如果全部都存在同一台机器上，这台机器挂掉会使所有服务挂掉。因此就有了JWT，把token存储在客户端。



* **基于JWT的Token**

  jwt全程为JSON Web Token，jwt是一个具体的规范，是Token的一种实现形式，它由三部分组成：头部Header、载荷Payload和签名Signature。

  ```javascript
  const header = {
  	alg: 'HS256',   // 加密算法 
      type: 'jwt'
  }
  
  const payload = {
    // 表示 jwt 创建时间
    iat: 1532135735,
  
    // 表示 jwt 过期时间
    exp: 1532136735,
  
    // 用户 id，用以通信
    user_id: 10086
  }
  
  // Sign 由 Header，Payload 以及 secretOrPrivateKey 计算而成。
  // 对于 secretOrPrivateKey，如果加密算法采用 HMAC，则为字符串，如果采用 RSA 或者 ECDSA，则为 PrivateKey。
  // 由 HMACSHA256 算法进行签名，secret 不能外泄
  const sign = HMACSHA256(base64.encode(header) + '.' + base64.encode(payload), secret)
  
  // jwt 由三部分拼接而成
  const jwt = base64.encode(header) + '.' + base64.encode(payload) + '.' + sign
  
  ```

  

  * jwt前两部分是对 header 以及 payload 的 base64 编码。

    当服务器收到客户端的 token 后，解析前两部分得到 header 以及 payload，并使用 header 中的算法与 secretOrPrivateKey 进行签名，判断与 jwt 中的签名是否一致。

  * jwt并不对数据进行加密，而是对数据进行签名，保证不被篡改。

  

* **CSRF攻击为什么是劫持cookie，而不是劫持token呢？**

  因为浏览器发送请求的时候不会自动带上token，而cookie在浏览器发送请求的时候会被自动带上。

  * cookie：用户点击链接，发送请求自动带上cookie，而之前的cookie未失效，导致服务端以为是用户正常操作，于是进行扣款操作。
  * token：用户点击链接，由于浏览器不会自动带上token，所以即便发送了请求，服务端器的token验证不会通过，所以不会进行扣款操作。