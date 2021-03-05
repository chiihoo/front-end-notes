**loader、plugin、代码分割、摇树优化**

---

* **loader可以加载资源文件，将js以外的资源处理成是可以导入的资源，比如css，图片之类的。就算是js也会通过babel-loader进行处理，ES6转化成ES5等，兼容低版本浏览器**



如果配置中有多个loader，执行顺序是从后往前依次执行的



**file-loader**：webpack会把各个模块打包，样式里的url本来是相对于原始文件所在的路径的，打包之后，路径发生了改变，url就访问不到了，file-loader就是修改文件引用路径的

**url-loader**：可以配置文件小于多少字节的时候，转为base64格式

**css-loader**: 把css文件转码

**style-loader**: 把转码后的css文件插入到相应的文件中去



所以应该先css-loader，后style-loader

倒着写['style-loader', 'css-loader']



* **plugin是对整体打包结果进行处理的插件，比如压缩混淆webpack-jsuglify-plugin，自动生成入门html页面webpack-html-plugin**



* **代码分割code spliting是将一开始不需要用到的模块打包到另外的文件中去，等到要用到的时候再进行加载**



* **摇树优化tree shaking指的是不需要用到的代码将不会放进打包结果中去，减少打包体积**

​       **这个功能依赖的是ES Module语法，因为有静态分析**





---



```
同步的loader
module.exports = function (source) {
    return source.replace(/var/g, 'const')
}
```

```
异步的loader
module.exports = function (source) {
    const callback = this.async()

    // 由于有 3 秒延迟，所以打包时需要 3+ 秒的时间
    setTimeout(() => {
        callback(null, `${source.replace(/;/g, '')}`)
    }, 3000)
}

```



```
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





