打包
将除js以外的其它资源也当成可以require的资源
  如 图片，css，json，svg，字体，
  它通过把这些非js资源转换为等价的js文件来实现。
  这些转换工具在webpack里被称为loader
    即使是js文件，也会经过babel-loader转换

plugin在webpack则是对整体的打包结果进行处理的一种插件机制
  如压缩，混淆，（uglifyjs-webpack-plugin ）
  处理通用（vendor）模块的抽离（common-chunks-plugin）
  自动生成入门html页面（html-webpack-plugin）

代码分割 code spliting
  将一开始不需要用到的模块打包到另一个或多个文件中，在需要的时候（代码执行到对应的位置时）再加载

摇树优化 tree shaking
  不需要用到的代码将不会进入到打包结果中，减少打包体积
  此功能主要依赖es module语法，因为它提供静态分析（即不运行代码对代码进行分析）的可能性