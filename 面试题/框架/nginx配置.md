```
server {
    listen 3000;
    server_name localhost;
    root /www/wwwroot/netease-music/front-end;

    location / {
        # 访问/home，则会先访问[root]/home文件，如果没有，则访问
        # [root]/home目录下的index文件，如果还没有，则访问
        # [root]/index.html
        try_files $uri $uri/ /index.html;
    }

    location /api {
        # 把/api/login重写成/login，并加到转发的接口地址上
        rewrite ^/api/(.*)$ /$1 break;
        proxy_pass http://localhost:3001;
    }
}
```

