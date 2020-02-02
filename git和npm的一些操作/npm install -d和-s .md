* cnpm install XX -D 就是cnpm install XX --save-dev
* cnpm install XX -S 就是cnpm install XX--save

这两个命令都会把包 安装到本地的node-modules中去
* -D，也就是--save-dev，同时会在package.json配置文件中，把这个包的名字与版本号添加到devDependencies属性中去
* -S，也就是--save，同时会在package.json配置文件中，把这个包的名字与版本号添加到dependencies属性中去

devDependencies里面的模块只用于开发环境，不用于生产环境，而 dependencies是需要发布到生产环境的。

比如我们写一个项目要依赖于jQuery，没有这个包的依赖运行就会报错，这时候就把这个依赖写入dependencies；
而我们使用的一些构建工具比如glup、webpack这些只是在开发中使用的包，上线以后就和他们没关系了，所以将它写入devDependencies。



* 总结就是：
    **如果只在开发阶段运行这个包，生产环境用不到，就用-D ，即--save-dev**
    **如果以后项目正式运行也需要用到这个包，就用-S ，即--save**
        


当以后运行  npm install （后面不加东西）时，就会自动根据package.json中devDependencies和dependencies依赖，把模块下载到node-modules中去

通过set NODE_ENV=development或set NODE_ENV=production命令可以指定开发还是生产环境
生产环境时，npm install只会下载dependencies依赖

同样的，如果未设置NODE_ENV，也可以这样做：
  npm install --production  // 仅会拉取dependencies中的依赖
  简写：npm install --prod
  

