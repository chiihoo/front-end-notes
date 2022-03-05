// 1. 工具支持通过node ./script.js --dir=./xxx/hello --dest=./xxx/yy常驻运行
// 2. 工具能够监听源文件夹下内容更新（创建文件、删除文件、文件内容变更）
// 3. 内容更新时能够同步变更至指定的目的文件夹下
// 4. 需要考虑做好异常场景处理，如是否为文件或文件夹，文件是否存在等

// 运行命令： node ./script.js --dir=./foo --dest=./bar

const fs = require('fs')
// const fsp = fs.promises
const path = require('path')
const chokidar = require('chokidar')

let dir = ''
let dest = ''

for (let i = 2; i < process.argv.length; i++) {
  const str = process.argv[i]
  if (str.slice(0, 6) === '--dir=') {
    dir = str.slice(6)
  } else if (str.slice(0, 7) == '--dest=') {
    dest = str.slice(7)
  }
}

const copyFile = pathname => {
  const srcPath = path.join(dir, path.relative(dir, pathname)) // path.relative(dir, pathname) 从/foo/a/b中获取到/a/b
  const targetPath = path.join(dest, path.relative(dir, pathname))
  fs.copyFileSync(srcPath, targetPath)
  // fs.writeFileSync(targetPath, fs.readFileSync(srcPath))
  // fs.createReadStream(srcPath).pipe(fs.createWriteStream(targetPath)) // 大文件复制
}

const unlinkFile = pathname => {
  const targetPath = path.join(dest, path.relative(dir, pathname))
  if (fs.existsSync(targetPath)) {
    fs.unlinkSync(targetPath)
  }
}

const copyDirectory = pathname => {
  // path.relative(dir, pathname) 从 /foo/a/b 中获取到 /a/b
  const targetPath = path.join(dest, path.relative(dir, pathname))
  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath)
  }
}
const unlinkDirectory = pathname => {
  // 1-2-3-3f.txt
  //    -4
  //  -5
  // chokidar遍历过程：先unlinkDir 5,3,4,2,1, 再unlink 3f.txt
  // 所以在删除文件夹之前，先把下面一个层级的文件给删了
  const targetPath = path.join(dest, path.relative(dir, pathname))
  let dirs = fs.readdirSync(targetPath)
  dirs.forEach(dir => {
    const tPath = path.join(targetPath, dir)
    let stat = fs.statSync(tPath)
    if (stat.isFile()) {
      fs.unlinkSync(tPath)
    }
  })
  fs.rmdirSync(targetPath)
}

async function main() {
  try {
    let dirStat = fs.statSync(dir)

    if (dirStat.isDirectory()) {
      const watcher = chokidar.watch(dir)
      watcher
        .on('all', (event, pathname) => {
          console.log(event, pathname)
        })
        .on('change', copyFile)
        .on('add', copyFile)
        .on('unlink', unlinkFile)
        .on('addDir', copyDirectory)
        .on('unlinkDir', unlinkDirectory)
    }
  } catch (e) {
    console.log(e)
  }
}

main()
