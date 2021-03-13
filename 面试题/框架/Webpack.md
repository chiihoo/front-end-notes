webpack是一个用于现在javascript应用程序的**静态模块打包工具**。

**webpack打包原理是根据文件间的依赖关系对其进行静态分析，然后将这些模块按指定规则生成静态资源，当 webpack 处理程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。**

webpack有两种组织模块的依赖方式，同步、异步。异步依赖将作为分割点，形成一个新的块；在优化了依赖树之后，每一个异步区块都将作为一个文件被打包。

webpack有一个智能解析器，几乎可以处理任何第三方库。无论它们的模块形式是CommonJS、AMD还是普通的JS文件；甚至在加载依赖的时候，允许使用动态表require("、/templates/"+name+"、jade")。



---



**loader、plugin、代码分割、摇树优化**

---

* **loader可以加载资源文件，将js以外的资源处理成是可以导入的资源，比如图片，CSS，JSON，SVG，字体之类的。就算是js也会通过babel-loader进行处理，ES6转化成ES5等，兼容低版本浏览器**



如果配置中有多个loader，执行顺序是从后往前依次执行的



**file-loader**：webpack会把各个模块打包，样式里的url本来是相对于原始文件所在的路径的，打包之后，路径发生了改变，url就访问不到了，file-loader就是修改文件引用路径的

**url-loader**：可以配置文件小于多少字节的时候，转为base64格式

**css-loader**: 把css文件转码

**style-loader**: 把转码后的css文件插入到相应的文件中去



所以应该先css-loader，后style-loader

倒着写['style-loader', 'css-loader']



**babel-preset-env**

**解析jsx的是@babel/preset-react**

**解析vue语法的是babel-preset-vue**



* **plugin是对整体打包结果进行处理的插件，比如压缩混淆uglifyjs-webpack-plugin，自动生成入门html页面html-webpack-plugin**



  如压缩，混淆，（uglifyjs-webpack-plugin ）
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

在插件开发中最重要的两个资源就是 compiler 和 compilation 对象。理解它们的角色是扩展 webpack 引擎重要的第一步。

**compiler 对象代表了完整的 webpack 环境配置**。这个对象在启动 webpack 时被一次性建立，并配置好所有可操作的设置，**包括 options，loader 和 plugin**。当在 webpack 环境中应用一个插件时，插件将收到此 compiler 对象的引用。可以使用它来访问 webpack 的主环境。

**compilation 对象代表了一次资源版本构建**。当运行 webpack 开发环境中间件时，每当检测到一个文件变化，就会创建一个新的 compilation，从而生成一组新的编译资源。一个 compilation 对象表现了当前的模块资源、编译生成资源、变化的文件、以及被跟踪依赖的状态信息。compilation 对象也提供了很多关键时机的回调，以供插件做自定义处理时选择使用。

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

/先在 webpack 配置文件中引入插件，然后在 plugins 选项中配置

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