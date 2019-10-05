// path.join([path1][, path2][, ...])
// path.join()方法可以连接任意多个路径字符串。要连接的多个路径可做为参数传入。同时也会对路径进行规范化。

// path.resolve([from ...], to)
// path.resolve()方法可以将多个路径解析为一个规范化的绝对路径。其处理方式类似于对这些路径逐一进行cd操作
// 详见 https://blog.csdn.net/kikyou_csdn/article/details/83150538
// 与  https://www.cnblogs.com/moqiutao/p/8523955.html

// __dirname为当前路径

// 配置文件就是配置这个命令：webpack ./src/main.js --output ./dist/bundle.js --mode development
// 当写好配置文件后，只需命令行输入webpack即可实现打包
// 使用 webpack-dev-server 这个工具可以实现自动打包编译的功能
// cnpm install webpack-dev-server --save-dev  
// 其中-save是在package.json中添加依赖"devDependencies"，-dev是在本地node_modules中安装包

const path = require('path')
// 通过node的模块操作，向外暴露了一个配置对象
module.exports = {
  mode: 'development',
  entry: './src/main.js', //webpack要打包哪个文件
  output: {
    // path: path.join(__dirname, './dist'), //打包好的文件要输出到哪个目录
    path: path.resolve(__dirname, 'dist'), //这里dist和./dist是一样的
    filename: 'bundle.js' //输出的文件名称
  }
}
