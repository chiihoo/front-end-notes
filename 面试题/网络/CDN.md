cdn是一个内容分发网络，一般会在不同地区都部署cdn服务器



在请求一个资源的时候，会经过DNS服务器解析域名得到ip，如果这个域名有CNAME别名，指向了一个CDN专用DNS服务器

DNS服务器查找CDN服务器地址，找出一个离用户最近的，将该ip地址返回给用户

