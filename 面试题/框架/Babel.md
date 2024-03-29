js新语法不兼容

用**babel-preset-env**来做语法的polyfill

https://juejin.cn/post/6844903602822053895



**babel-preset-env 能根据当前的运行环境，自动确定你需要的 plugins 和 polyfills。**



**babel-polyfill 是为了模拟一个完整的ES2015+环境，旨在用于应用程序而不是库/工具。并且使用babel-node时，这个polyfill会自动加载。要注意的是babel-polyfill是一次性引入你的项目中的，并且同项目代码一起编译到生产环境。而且会污染全局变量。**

```
entry: {
	app: ['babel-polyfill','./main.js']
}
```



**babel-runtime不会污染全局空间和内置对象原型。事实上babel-runtime是一个模块，你可以把它作为依赖来达成ES2015的支持。**

比如环境不支持Promise，你可以在项目中加入

```
require('babel-runtime/core-js/promise')
```

来获取Promise。

这样我们就弥补了babel-polyfill的缺点，达到了按需加载的效果。但是在实际项目开发过程中，我们往往会写很多新的es6 api，每次都要手动引入相应的包比较麻烦，维护起来也不方便，每个文件重复引入也造成代码的臃肿。

要解决这个问题，就要用到 `babel-plugin-transform-runtime`，它会分析我们的 ast 中，是否有引用 babel-rumtime 中的垫片（通过映射关系），如果有，就会在当前模块顶部插入我们需要的垫片。

```
{
	"plugins": ["transform-runtime"]
}
```











