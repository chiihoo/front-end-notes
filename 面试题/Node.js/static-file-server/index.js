const http = require('http')
const fs = require('fs')
const fsp = fs.promises
const path = require('path')

const port = 5500
// const baseDir = __dirname
const baseDir = path.resolve('./')

const mimeMap = {
  '.jpg': 'image/jpeg',
  '.html': 'text/html',
  '.css': 'text/stylesheet',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.txt': 'text/plain',
}

// const server = http.createServer((req, res) => {
//   console.log(req.method, req.url)

//   res.setHeader('content-type', 'text/html; charset=UTF-8')
//   let targetPath = path.join(baseDir, req.url) // 这里的req.url指的是.com后面的部分 /foo.js

//   // 1. 根据地址栏输入的的url拼接本地文件的地址
//   // 2. 检查这个地址是否存在，如果不存在，则返回404
//   // 3. 若地址是一个文件，则返回文件内容
//   // 4. 若地址是一个文件夹，若文件夹中包含index.html，则展示其内容，若不包含index.html，则展示文件夹目录。
//   // 若为文件夹，地址栏中输入的url结尾要自动加上'/'

//   fs.stat(targetPath, (err, stat) => {
//     if (err) {
//       res.writeHead(404)
//       res.end('404 Not Found')
//     } else {
//       if (stat.isFile()) {
//         // 文件
//         fs.readFile(targetPath, (err, data) => {
//           res.end(data)
//         })
//       } else if (stat.isDirectory()) {
//         // 文件夹
//         let indexPath = path.join(targetPath, 'index.html')
//         fs.stat(indexPath, (err, stat) => {
//           if (err) {
//             // 文件夹中没有index.html，则展示文件夹目录
//             if (!req.url.endsWith('/')) { // 如果地址栏键入的url不是以'/'结尾，则加上'/'跳转
//               res.writeHead(301, {
//                 Location: req.url + '/',
//               })
//               res.end()
//               return
//             }
//             fs.readdir(targetPath, { withFileTypes: true }, (err, entries) => {
//               res.end(
//                 `${entries
//                   .map(entry => {
//                     let slash = entry.isDirectory() ? '/' : ''
//                     return `
//                       <div>
//                         <a href="${entry.name}${slash}">${entry.name}${slash}</a>
//                       </div>`
//                   })
//                   .join('')}`
//               )
//             })
//           } else {
//             // 文件夹中有index.html，则展示该内容
//             fs.readFile(indexPath, (err, data) => {
//               res.end(data)
//             })
//           }
//         })
//       }
//     }
//   })
// })

// 1. 根据地址栏输入的的url拼接本地文件的地址
// 2. 检查这个地址是否存在，如果不存在，则返回404
// 3. 若地址是一个文件，则返回文件内容
// 4. 若地址是一个文件夹，若文件夹中包含index.html，则展示其内容，若不包含index.html，则展示文件夹目录。
// 若为文件夹，地址栏中输入的url结尾要自动加上'/'
const server = http.createServer(async (req, res) => {
  console.log(req.method, req.url)

  let targetPath = decodeURIComponent(path.join(baseDir, req.url))
  let type = mimeMap[path.extname(targetPath)]
  res.setHeader('content-type', `${type}; charset=UTF-8`)

  // 安全问题，请求路径可能用../../来提升到本文件层级上层，需要杜绝掉
  if (!targetPath.startsWith(baseDir)) {
    res.end()
    return
  }

  // 阻止发生以'.'开头的隐藏文件
  if (targetPath.split('/').some(seg => seg.startsWith('.'))) {
    res.end()
    return
  }

  try {
    let stat = await fsp.stat(targetPath)
    if (stat.isFile()) {
      try {
        let data = await fsp.readFile(targetPath)
        res.end(data)
      } catch (e) {
        res.writeHead(502)
        res.end('文件读取错误')
      }
    } else if (stat.isDirectory()) {
      let indexPath = path.join(targetPath, 'index.html')
      try {
        await fsp.stat(indexPath) // 读index.html路径
        try {
          let indexContent = await fsp.readFile(indexPath)
          res.end(indexContent)
        } catch (e) {
          res.writeHead(502)
          res.end('index.html文件读取错误')
        }
      } catch (e) {
        // index.html不存在
        if (!req.url.endsWith('/')) {
          // 如果地址栏键入的url不是以'/'结尾，则加上'/'跳转
          res.writeHead(301, {
            Location: req.url + '/',
          })
          res.end()
          return
        }
        let entries = await fsp.readdir(targetPath, { withFileTypes: true })
        res.end(
          `${entries
            .map(entry => {
              let slash = entry.isDirectory() ? '/' : ''
              return `
                <div>
                  <a href="${entry.name}${slash}">${entry.name}${slash}</a>
                </div>`
            })
            .join('')}`
        )
      }
    }
  } catch (e) {
    res.writeHead(404)
    res.end('404 Not Found')
  }
})

server.listen(port, () => {
  console.log(port)
})
