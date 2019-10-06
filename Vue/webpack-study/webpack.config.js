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
// cnpm install webpack-dev-server -d
// 由于是在本地安装的webpack-dev-server，无法把它当作脚本命令，直接在终端中运行，只有安装到全局-g的工具，才能直接在终端输入运行
// 可以在package.json中的"script"属性中添加一行 "dev": "webpack-dev-server --open --contentBase src --hot"，即可npm run dev 运行
// --open 自动打开
// --contentBase src 以src这个文件夹为根路径
// --port 3000 设置端口号为3000
// --hot 内容更新后以补丁的形式加上，不会每次都生成一份新的bundle.js，并且可以实现样式更改后，无刷新的更新页面

// 同时，引入应该这样写<script src="/bundle.js"></script>，因为这个插件自动生成的bundle.js文件直接托管在了内存中，而不是磁盘上
// <script src="../dist/bundle.js"></script>这样写是根本找不到修改后的bundle.js的
// 修改完成后还是需要运行webpack更新一下磁盘上的bundle.js



const path = require('path')

// 导入在内存中生成html页面的插件
// 只要是插件，就一定要放到plugins节点中去
// 这个插件有两个作用：
//   1.自动在内存中根据指定页面生成一个内存中的页面
//   2.自动把打包好的bundle.js追加到页面中去
const htmlWebpackPlugin = require('html-webpack-plugin')

// 通过node的模块操作，向外暴露了一个配置对象
module.exports = {
  mode: 'development',
  entry: './src/main.js', //webpack要打包哪个文件
  output: {
    // path: path.join(__dirname, './dist'), //打包好的文件要输出到哪个目录
    path: path.resolve(__dirname, 'dist'), //这里dist和./dist是一样的
    filename: 'bundle.js' //输出的文件名称
  },
  plugins: [
    new htmlWebpackPlugin({ //创建一个 在内存中生成html页面的插件
      template: path.join(__dirname, './src/index.html'),  //指定模板页面。将来会根据指定的页面路径，去生成内存中的页面
      filename: 'index.html', //制定生成的页面的名称
    })
  ],
  module: {  //这个节点用于配置所有第三方模块加载器
    rules: [ // 所有第三方模块的模块的匹配和处理规则
      {   //配置处理.css文件的第三方loader规则
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],//调用的顺序是从后往前调
      },
      {   //配置处理.less文件的第三方loader规则
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {   //配置处理.scss文件的第三方loader规则
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      }
    ]
  }
}
