const http = require('http')
const fs = require('fs')
const fsp = fs.promises
const path = require('path')

const port = 8090
const baseDir = __dirname

var mimeMap = {
  '.css': 'text/css',
  '.gif': 'image/gif',
  '.html': 'text/html',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.swf': 'application/x-shockwave-flash',
  '.tiff': 'image/tiff',
  '.txt': 'text/plain',
  '.wav': 'audio/x-wav',
  '.wma': 'audio/x-ms-wma',
  '.wmv': 'video/x-ms-wmv',
  '.xml': 'text/xml',
  // 底下这两个是随便加的
  '.md': 'text/plain',
  '': 'text/plain'
}

// 思路：使用http模块创建一个服务器，用根目录__dirname与用户请求的路径req.url拼接，得到当前完整路径，这个路径如果有中文就会被转码，需要解码
// 通过fs.stat模块来判断当前路径是文件还是文件夹
// 一、 如果是文件，则直接返回这个文件的内容
// 二、 如果是文件夹，判断这个文件夹里面是否有index.html文件
//     1. 有：返回这个index.html中的内容
//     2. 没有：用fs.readdir()读取这个文件夹中每个文件的名字，遍历生成html列表返回

// 注意事项：
// 1. 用mimeMap可以保存不同格式的文件返回的 'Content-Type' 文件类型
// 2. 'Content-Type': 'text/html; charset=UTF-8'需要编码格式
// 3. url末尾要加斜杠'/'

// 回调版本
const server = http.createServer((req, res) => {
  // decodeURIComponent解码
  var targetPath = decodeURIComponent(path.join(baseDir, req.url))
  fs.stat(targetPath, (err, stat) => {
    if (err) {
      // 这里可以把每个文件的类型写进去，其中path.extname()可以返回path路径的文件扩展名
      var type = mimeMap[path.extname(targetPath)]
      res.writeHead(404, {
        'Content-Type': `${type}; charset=UTF-8`
      })
      res.end('404 Not Found')
    } else {
      if (stat.isFile()) {
        fs.readFile(targetPath, (err, data) => {
          if (err) {
            res.writeHead(502, {
              'Content-Type': 'text/html; charset=UTF-8'
            })
            res.end('502 Internal Server Error')
          } else {
            res.writeHead(200, {
              'Content-Type': 'text/plain; charset=UTF-8'
            })
            res.end(data)
          }
        })
      } else if (stat.isDirectory()) {
        var indexPath = path.join(targetPath, 'index.html')
        fs.stat(indexPath, (err, stat) => {
          if (err) {
            // index.html not exist
            // url末尾处加斜杠'/'
            if (!req.url.endsWith('/')) {
              res.writeHead(301, {
                'Content-Type': 'text/html; charset=UTF-8',
                Location: req.url + '/'
              })
              res.end()
              return
            }
            res.writeHead(200, {
              'Content-Type': 'text/html; charset=UTF-8'
            })
            // 把文件夹里面的所有文件遍历出来
            fs.readdir(targetPath, { withFileTypes: true }, (err, entries) => {
              res.end(`
                ${entries
                  .map(entry => {
                    // 是文件夹的话末尾要加'/'
                    var slash = entry.isDirectory() ? '/' : ''
                    return `
                      <dir>
                        <a href="${entry.name}${slash}">${entry.name}${slash}</a>
                      </dir>
                    `
                  })
                  .join('')}
              `)
            })
          } else {
            // index.html exist, return it's content
            fs.readFile(indexPath, (err, data) => {
              res.end(data)
            })
          }
        })
      }
    }
  })
})

// Promise版本
const serverP = http.createServer(async (req, res) => {
  // decodeURIComponent解码
  var targetPath = decodeURIComponent(path.join(baseDir, req.url))
  try {
    var stat = await fsp.stat(targetPath)
    if (stat.isFile()) {
      var data = await fsp.readFile(targetPath)
      // 这里可以把每个文件的类型写进去，其中path.extname()可以返回path路径的文件扩展名
      var type = mimeMap[path.extname(targetPath)]
      res.writeHead(200, {
        'Content-Type': `${type}; charset=UTF-8`
      })
      res.end(data)
    } else if (stat.isDirectory()) {
      var indexPath = path.join(targetPath, 'index.html')
      try {
        await fsp.stat(indexPath) //判断是否有index.html，如果没有index.html，会报错，跳到catch中去
        var indexContent = await fsp.readFile(indexPath)
        res.writeHead(200, {
          'Content-Type': 'text/html; charset=UTF-8'
        })
        res.end(indexContent)
      } catch (e) {
        // index.html文件不存在
        // url末尾处加斜杠'/'
        if (!req.url.endsWith('/')) {
          res.writeHead(301, {
            'Content-Type': 'text/html; charset=UTF-8',
            Location: req.url + '/'
          })
          res.end()
          return
        }
        res.writeHead(200, {
          'Content-Type': 'text/html; charset=UTF-8'
        })
        // 把文件夹里面的所有文件遍历出来
        var entries = await fsp.readdir(targetPath, { withFileTypes: true })
        res.end(`
          ${entries
            .map(entry => {
              // 是文件夹的话末尾要加'/'
              var slash = entry.isDirectory() ? '/' : ''
              return `
                <dir>
                  <a href="${entry.name}${slash}">${entry.name}${slash}</a>
                </dir>
              `
            })
            .join('')}
        `)
      }
    }
  } catch (e) {
    res.writeHead(404, {
      'Content-Type': 'text/html; charset=UTF-8'
    })
    res.end('404 Not Found')
  }
})

// server.listen(port, () => {
//   console.log(port)
// })
serverP.listen(port, () => {
  console.log(port)
})
