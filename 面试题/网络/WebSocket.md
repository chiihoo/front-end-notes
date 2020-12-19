**`WebSocket`与`keep-alive`的区别**

`Http`协议中的`keep-alive`是指一次`TCP`连接中完成多个`HTTP`请求，但是对每个请求仍然要单独发`header`，它所建立的“长连接”是伪长连接，好处是不需要对现有的 `HTTP server` 和浏览器架构做修改就能实现。

`WebSocket` 解决的第一个问题是，通过第一个 `HTTP request` 建立了 `TCP` 连接之后，之后的交换数据都不需要再发 `HTTP request`了，使得这个长连接变成了一个真.长连接。但是不需要发送 `HTTP header`就能交换数据显然和原有的 HTTP 协议是有区别的，所以它需要对服务器和客户端都进行升级才能实现。在此基础上 `WebSocket` 还是一个双通道的连接，在同一个 `TCP` 连接上既可以发也可以收信息。此外还有 `multiplexing` 多路复用功能，几个不同的 URI 可以复用同一个 `WebSocket` 连接。这些都是原来的 `HTTP` 不能做到的。

