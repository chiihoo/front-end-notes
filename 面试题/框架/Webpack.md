```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname + "/dist",
        filename: "index.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: "index.html",
        }),
    ]
}

```



热更新原理：当文件更改后，会触发webpack重新构建，服务器向浏览器发送更新消息，浏览器通过jsonp来拉取更新的文件，jsonp回调触发热更新逻辑



**webpack优化：**

1. 比如**babel-loader可以通过exclude排除node_module之类的**

2. **thread-loader多线程打包提升速度**，webpack4可以用HappyPack多进程打包
3. **缓存loader解析的结果**
4. **ES module可以使用Tree Shaking**





webpack是一个用于现在javascript应用程序的**静态模块打包工具**。

**webpack打包原理是根据文件间的依赖关系对其进行静态分析，然后将这些模块按指定规则生成静态资源，当 webpack 处理程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。**

webpack有两种组织模块的依赖方式，同步、异步。异步依赖将作为分割点，形成一个新的块；在优化了依赖树之后，每一个异步区块都将作为一个文件被打包。

webpack有一个智能解析器，几乎可以处理任何第三方库。无论它们的模块形式是CommonJS、AMD还是普通的JS文件；甚至在加载依赖的时候，允许使用动态表require("、/templates/"+name+"、jade")。



---



**loader、plugin、代码分割、摇树优化**

---

* **loader可以加载资源文件，将js以外的资源处理成是可以导入的资源，比如图片，CSS，JSON，SVG，字体之类的。就算是js也会通过babel-loader进行处理，ES6转化成ES5等，兼容低版本浏览器**



如果配置中有多个loader，执行顺序是从后往前依次执行的



**file-loader**：`file-loader` 就是在 `JavaScript` 代码里 `import/require` 一个文件时，会将该文件生成到输出目录，并且在 `JavaScript` 代码里返回该文件的地址。

**url-loader**：可以配置文件小于多少字节的时候，转为base64格式

**css-loader**: 把文件中导入的css全部收集

**style-loader**: 在收集完成的css外面加个style标签插入到相应的文件中去



babel-loader有三种方法配置

第一种在.babelrc文件

第二种在package.json中加preset字段

第三种直接在webpack.config.js中loader的配置里面

```
module ={
	rules:[
	{
        test: /.jsx?$/,
        exclude: /node_modules/, // 优先级比teset和include都高，不解析node_modules中的文件
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false, // 不要再去找babelrc文件了，规则全在这指定完了
            presets: ['@babel/preset-react', ['@babel/preset-env', { modules: false }]], 
            cacheDirectory: true // 给编译加个缓存
          }
        }
      },
	]
}
```







- file-loader：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件
- url-loader：和 file-loader 类似，但是能在文件很小的情况下以 base64 的方式把文件内容注入到代码中去
- source-map-loader：加载额外的 Source Map 文件，以方便断点调试
- image-loader：加载并且压缩图片文件
- babel-loader：把 ES6 转换成 ES5
- css-loader：加载 CSS，支持模块化、压缩、文件导入等特性
- style-loader：把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS
- eslint-loader：通过 ESLint 检查 JavaScript 代码



所以应该先css-loader，后style-loader

倒着写['style-loader', 'css-loader']



**babel-preset-env**

**解析jsx的是@babel/preset-react**

**解析vue语法的是babel-preset-vue**



* **plugin是对整体打包结果进行处理的插件，比如压缩混淆~~uglifyjs-webpack-plugin~~ terser-webpack-plugin，自动生成入门html页面html-webpack-plugin**



  如压缩，混淆，（terser-webpack-plugin ）
  自动生成入门html页面（html-webpack-plugin）



* **代码分割code spliting是将一开始不需要用到的模块打包到另外的文件中去，等到要用到的时候再进行加载**



* **摇树优化tree shaking指的是不需要用到的代码将不会放进打包结果中去，减少打包体积**

​       **这个功能依赖的是ES Module语法，因为有静态分析**





---



```js
// 同步的loader
module.exports = function (source) {
    return source.replace(/var/g, 'const')
}
```

```js
// 异步的loader
module.exports = function (source) {
    const callback = this.async()

    // 由于有 3 秒延迟，所以打包时需要 3+ 秒的时间
    setTimeout(() => {
        callback(null, `${source.replace(/;/g, '')}`)
    }, 3000)
}

```



```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: ['raw-loader']
      }
    ]
  }
}
```





**loader**

1. Webpack在模块里面搜索css的依赖项，即Webpack检查js文件是否有“require('myCssFile.css')”的引用，如果它发现有css的依赖，Webpack将css文件交给“css-loader”去处理
2. css-loader加载所有的css文件以及css自身的依赖（比如@import 其他css）到JSON对象里，Webpack然后将处理结果传给“style-loader”
3. style-loader接受JSON值然后添加一个style标签并将其内嵌到html文件里



**plugin**

webpack 在整个编译周期中会触发很多不同的事件，plugin 可以监听这些事件，并且可以调用 webpack 的 API 对输出资源进行处理。

这是它和 loader 的不同之处，loader 一般只能对源文件代码进行转换，而 plugin 可以做得更多。plugin 在整个编译周期中都可以被调用，只要监听事件。

在插件开发中最重要的两个资源就是 compiler 和 compilation 对象。理解它们的角色是扩展 webpack 引擎重要的第一步。

**compiler 对象代表了完整的 webpack 环境配置**。这个对象在启动 webpack 时被一次性建立，并配置好所有可操作的设置，**包括 options，loader 和 plugin**。当在 webpack 环境中应用一个插件时，插件将收到此 compiler 对象的引用。可以使用它来访问 webpack 的主环境。

**compilation 对象代表了一次资源版本构建**。当运行 webpack 开发环境中间件时，每当检测到一个文件变化，就会创建一个新的 compilation，从而生成一组新的编译资源。一个 compilation 对象表现了当前的模块资源、编译生成资源、变化的文件、以及被跟踪依赖的状态信息。compilation 对象也提供了很多关键时机的回调，以供插件做自定义处理时选择使用。



在**emit**事件发生时，代表源文件的转换和组装已经完成，在这里可以读取到最终将输出的资源、代码块、模块及其依赖，并且可以修改输出资源的内容。

 **watch-run** 事件代表依赖的文件发生了变化

https://segmentfault.com/a/1190000012840742



https://segmentfault.com/a/1190000024431022?utm_source=sf-related

简单的示例

```js
function Plugin(options) { }
Plugin.prototype.apply = function (compiler) {
    // 所有文件资源都被 loader 处理后触发这个事件
    compiler.plugin('emit', function (compilation, callback) {
        // 功能完成后调用 webpack 提供的回调
        console.log('Hello World')
        callback()
    })
}

module.exports = Plugin
```

先在 webpack 配置文件中引入插件，然后在 plugins 选项中配置

```js
const Plugin = require('./src/plugin')

module.exports = {
    ...
    plugins: [
        new Plugin()
    ]
}
```

再来写一个复杂点的插件，它的作用是将经过 loader 处理后的打包文件 `bundle.js` 引入到 `index.html` 中

```js
function Plugin(options) { }

Plugin.prototype.apply = function (compiler) {
    // 所有文件资源经过不同的 loader 处理后触发这个事件
    compiler.plugin('emit', function (compilation, callback) {
        // 获取打包后的 js 文件名
        const filename = compiler.options.output.filename
        // 生成一个 index.html 并引入打包后的 js 文件
        const html =         `<!DOCTYPE html>
                      <html lang="en">
                      <head>
                          <meta charset="UTF-8">
                          <meta name="viewport" content="width=device-width, initial-scale=1.0">
                          <title>Document</title>
                          <script src="${filename}"></script>
                      </head>
                      <body>
                      </body>
                      </html>`
        // 所有处理后的资源都放在 compilation.assets 中
        // 添加一个 index.html 文件
        compilation.assets['index.html'] = {
            source: function () {
                return html
            },
            size: function () {
                return html.length
            }
        }

        // 功能完成后调用 webpack 提供的回调
        callback()
    })
}

module.exports = Plugin
```

![](https://segmentfault.com/img/remote/1460000024431027)

