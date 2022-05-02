网易云音乐api部署

```
PORT=3695 pm2 start app.js
```





NestJs项目部署 

需要更改数据库账户密码，还要将upload.controller.ts文件中返回的图片路径改为真实路径

```
pm2 start dist/main.js  --name blog-backend
```



特别要注意的是，由于上传文件使用了如下路径，如果在build出来的dist文件夹中使用start main.js，会导致路径不正确

``` 
ServeStaticModule.forRoot({
   rootPath: join(__dirname, '..', 'public'),
})
```

所以需要在更上一级的文件夹中使用start dist/main.js来执行