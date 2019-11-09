// 运行需要运行命令     node http-server.js

// http模块先建立侦听端口，监听端口号，如果有人连过来了，它会解析对方发过来的东西，
// 如果确实是http报文，就会触发server.on('request',...)事件，并且基于那个tcp连接封装出server.on()里面的request和response

const http = require('http')

// const server = new http.Server()
const server = http.createServer()
const port = 8899

server.on('request', (request, response) => {
  console.log(request.method, request.url)
  console.log(request.headers)

  //也可以不写这句加响应体，默认会自动加完响应头后再把下面那句响应体写入进去
  // response.writeHead(200, {
  //   'Content-Type': 'text/html'
  // })

  response.write('hello world')
  response.end()
})

server.listen(port, () => {
  console.log('server listening on port', port)
})

