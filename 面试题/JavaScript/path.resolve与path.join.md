```
// __dirname === 'D:\myProgram\test' 

path.resolve在路径上加.与不加.上的区别
path.resolve中单独的/斜杠开头，会直接替换掉前面的路径
而./点斜杠开头，则是与前面路径进行拼接
// path.resolve(__dirname,'./img/so')    === 'D:\myProgram\test\img\so'
// path.resolve(__dirname,'/img/so')     === 'D:\img\so'

path.join都是与前面路径进行拼接
// path.join(__dirname,'./img/so')       === 'D:\myProgram\test\img\so'
// path.join(__dirname,'/img/so')        === 'D:\myProgram\test\img\so'

还可以像下面这样，第二个参数'../'会使已经拼接到的目录往上跳一级，而第三个参数的语法叫做glob
// https://juejin.cn/post/6876363718578405384

path.join(__dirname, '../', '**/*.entity.{ts,js}')
path.join(__dirname, '..', '**/*.entity.{ts,js}')		// ..和../是一样的

两个星号 ** 可以跨片段匹配零个或多个字符，也就是说 ** 是递归匹配所有文件和目录的，如果后面有分隔符，即 **/ 的话，则表示只递归匹配所有目录（不含隐藏目录）。
```

