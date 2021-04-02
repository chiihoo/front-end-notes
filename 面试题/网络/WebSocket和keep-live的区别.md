**`WebSocket`与`Http`的`keep-alive`的区别**

`Http`协议中的`keep-alive`是指一次`TCP`连接中完成多个`HTTP`请求，但是对每个请求仍然要单独发`header`，它所建立的“长连接”是伪长连接，好处是不需要对现有的 `HTTP server` 和浏览器架构做修改就能实现。

**`WebSocket` 解决的第一个问题是，通过第一个 `HTTP request` 建立了 `TCP` 连接之后，之后的交换数据都不需要再发 `HTTP request`了，使得这个长连接变成了一个真正的长连接。**但是不需要发送 `HTTP header`就能交换数据显然和原有的 HTTP 协议是有区别的，所以它需要对服务器和客户端都进行升级才能实现。在此基础上 `WebSocket` 还是一个双通道的连接，在同一个 `TCP` 连接上既可以发也可以收信息。此外还有 `multiplexing` 多路复用功能，几个不同的 URI 可以复用同一个 `WebSocket` 连接。这些都是原来的 `HTTP` 不能做到的。



流程

1. 客户端发送一个GET请求：

   `Upgrade: websocket`

   `Connection: Upgrade`

2. 服务端给客户端返回101状态码，切换协议







**轮询**是客户端每隔一段时间就往服务器发请求，询问有没有新的信息

**长轮询**是客户端向服务端发请求，服务端把请求hold住一段时间，比如十几二十秒，如果有新的消息，再回复。比如微信扫码登录，长轮询，之后用户扫码登录之后，服务端得知已登录，就把登录信息发给客户端

**http的keep-alive**就是，请求头加入**`Connection: keep-alive`**，HTTP/1.0中以及HTTP/1.1中，都有这个机制，但是HTTP/1.1中默认开启，如果不想开启，则请求头加入**`Connection: close`**，则会关闭长连接

HTTP/1.1逐渐停止了对keep-alive连接的支持，用**`persistent`**连接替代了它。

与keep-alive连接不同，HTTP/1.1中persistent连接默认就是激活的，





**TCP中的`keep-alive`**跟http的`keep-alive`差别比较大

当有一方因为网络故障或者宕机导致连接失效，由于 TCP 并不是一个轮询的协议，在下一个数据包到达之前，对端对连接失效的情况是一无所知的。

TCP中的`keep-alive`是为了探测对端的连接有没有失效

现状是大部分的应用并没有默认开启 TCP 的`keep-alive`选项

7200s也就是两个小时才检测一次，时间太长