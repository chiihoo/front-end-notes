- **XSS跨站脚本攻击**

  Cross Site Script，指的是攻击者通过在web页面嵌入恶意代码，当用户在打开网页后，恶意代码会自动执行。

  XSS的实质就是js代码的注入，有时候也包括html和flash。很多种方式进行 XSS 攻击，但它们的共同点为：将一些隐私数据像cookie、session 发送给攻击者，将受害者重定向到一个由攻击者控制的网站，在受害者的机器上进行一些恶意操作。

  当用户对某个参数的输入原封不动的在源代码中出现的时候，这个参数可以说存在XSS漏洞。比如用document.cookie来窃取用户的cookie，将cookie的HttpOnly属性设置成true，可以一定程度防范。

  - **反射型XSS**

    **攻击者诱使用户点击恶意链接，或者进入恶意网站，以此注入脚本，比如窃取用户的cookie。**

  - **存储性XSS**

    **攻击者将带有恶意代码的数据存储在服务端，当用户请求数据时，脚本会从服务器中传回并执行。**

    比如，攻击者在一个社区网站上传了一篇包含恶意代码的文章或者评论，该文章或评论会被上传到服务器，当其他用户访问该文章或评论时，恶意代码会被执行。

  - **dom型XSS**

    dom型的XSS不与后台交互，只改变前台的dom结构

    
    
    造成的后果：
    
    1. 窃取`Cookie`。
    
    2. 监听用户行为，比如输入账号密码后直接发送到黑客服务器。
    
    3. 修改 DOM 伪造登录表单。
    
    4. 在页面中生成浮窗广告。
    
       

- **XSS攻击的防御手段**

  - **主流浏览器的[CSP](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP)内容安全策略。**内容安全策略（CSP）是一个额外的安全层，用于检测并削弱某些特定类型的攻击，包括跨站脚本 (XSS) 和数据注入攻击等。该安全策略的实现基于一个称作 `Content-Security-Policy `的HTTP首部。

    开发者明确告诉客户端（制定比较严格的策略和规则），哪些外部资源是可以加载和执行的 ，即使攻击者发现漏洞，但是它是没办法注入脚本的。CSP 的实质就是白名单制度，开发者明确告诉客户端，哪些外部资源可以加载和执行，等同于提供白名单。它的实现和执行全部由浏览器完成，开发者只需提供配置。CSP 大大增强了网页的安全性。攻击者即使发现了漏洞，也没法注入脚本，除非还控制了一台列入了白名单的可信主机。

    通过 HTTP 头信息的Content-Security-Policy的字段，或者`<meta http-equiv="Content-Security-Policy" content="script-src 'self'">`均可以启用CSP。

    常见的配置为 `default-src 'none'; script-src 'self'; connect-src 'self'; img-src 'self'; style-src 'self';`该策略允许加载同源的图片、脚本、AJAX和CSS资源，并阻止加载其他任何资源，对于大多数网站是一个不错的配置。

  - **cookie的HttpOnly属性设为true。**

    这样就禁止客户端的js脚本访问HttpOnly为true的cookie。

  - **进行输入输出检查。**

    不要相信用户的输入，对用户的任何输入都要进行检查、过滤、转义。在 XSS 防御中，输入检查一般是检查用户输入的数据中是否包含 `<`，`>` 等特殊字符，如果存在，则对特殊字符进行过滤或编码，比如`&lt;`和`&gt;`，这种方式也称为 XSS Filter。

    innerText、textContent
  
    当然，现在前端的主流框架基本上已经做好XSS攻击的防范了，不需要后端进行过滤、转义了。
  
    


---



- **CSRF跨站请求伪造**

  Cross Site Request Forgery，是一种劫持受信任用户向服务器发送非预期请求的攻击方式。

  攻击者借助受害者的 Cookie 骗取目标服务器的信任，以受害者的名义跨站请求目标服务器。

  比如用户刚刚访问过了银行的网站，浏览器中存在该网站的cookie，之后用户访问了恶意网站，恶意代码恰巧是会从该银行转账，这时候由于访问该接口时会自动带上该域上的cookie，银行后端会认为是用户正常操作，那么账户上的金额会被转走。

  

  **CSRF攻击方式**

  1. 打开网页，自动发送GET请求

     `<img src="https://xxx.com/info?user=hhh&count=100">`

  2. 打开网页，自动发送POST请求

     ```
     <form id='hacker-form' action="https://xxx.com/info" method="POST">
     	<input type="hidden" name="user" value="hhh" />
       <input type="hidden" name="count" value="100" />
     </form>
     <script>document.getElementById('hacker-form').submit();</script>
     ```

  3. 诱导用户发送GET请求

     `<a href="https://xxx/info?user=hhh&count=100" taget="_blank">点击进入XXX</a>`

     

  和`XSS`攻击对比，CSRF 攻击并不需要将恶意代码注入用户当前页面的`html`文档中，而是跳转到新的页面，利用服务器的**验证漏洞**和**用户之前的登录状态**来模拟用户进行操作。

  

- **CSRF攻击的防御手段**

  - **验证码**

    验证码被认为是对抗 CSRF 攻击最简洁而有效的防御方法。

  - **Referer Check 服务端验证请求来源站点**

    根据 HTTP 协议，在 HTTP 头中有一个字段叫 Referer，它记录了该 HTTP 请求的来源地址。通过 Referer Check，可以检查请求是否来自合法的"源"。比如请求从A网站www.a.com发出的，Referer的值就是www.a.com。那么只要在服务端对请求进行验证，限定某些请求的"源"为官方网站www.b.com，如果`req.headers.referer !=='http://www.b.com'`，则中断这个请求。

    在某些情况下是可以伪造的，ajax自定义请求头，安全性略差。

  - **cookie的SameSite属性**

    Strict模式下，浏览器完全禁止第三方请求携带cookie。

    Lax模式下，第三方请求只能通过get方式携带cookie，其余情况均禁止。

    None模式下，允许跨域发送请求携带cookie。

    跟第二条的作用很相像，第二条是服务器端来验证，第三条是浏览器端会自动禁止。

  - **将cookie验证换成token验证**

    由于浏览器不会自动带上token，所以即便发送了请求，服务端器的token验证不会通过。

    

- **CSRF攻击为什么是劫持cookie，而不是劫持token呢？**因为浏览器发送请求的时候不会自动带上token，而cookie在浏览器发送请求的时候会被自动带上。

  - cookie：用户点击链接，发送请求自动带上cookie，而之前的cookie未失效，导致服务端以为是用户正常操作，于是进行扣款操作。
  - token：用户点击链接，由于浏览器不会自动带上token，所以即便发送了请求，服务端器的token验证不会通过，所以不会进行扣款操作。
  
  
  
  都是恶意网站，窃取cookie的是XSS，利用用户的cookie去伪造身份的是CSRF。
  
  在正常网站，用发表文章这种方式将恶意代码存储到服务端的，是XSS。
  
  
  

