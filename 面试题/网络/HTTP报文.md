- **请求**
  - 请求行
  - 请求头
  - 请求体
- **响应**
  - 响应行
  - 响应头
  - 响应体



![](https://s3.51cto.com/wyfs02/M02/22/DA/wKiom1MphduAsu6XAAM_loPLbc0713.jpg)





```
请求头中请求的url为/users?id=11111&username=s&password=789
后端nestjs用@Query解码

Content-Type标注了请求体的数据格式的数据格式是application/json
后端nestjs用@Body解码

POST /users?id=11111&username=s&password=789 HTTP/1.1
Content-Type: application/json
User-Agent: PostmanRuntime/7.26.8
Accept: */*
Postman-Token: 1fad7daa-f090-493f-bc98-e083012b7889
Host: localhost:3000
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Content-Length: 112

{
    "id": "1111s1",
    "username": "s",
    "password": "789111111",                                                  <------
    "email": "",
    "phone": ""
}

HTTP/1.1 201 Created
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 4
ETag: W/"4-X/5TO4MPCKAyY0ipFgr6/IraRNs"
Date: Sat, 23 Jan 2021 05:30:46 GMT
Connection: keep-alive
```

```
Content-Type标注了请求体的数据格式是application/x-www-form-urlencoded
后端nestjs用@Body解码

POST /users?id=11111&username=s&password=789 HTTP/1.1
User-Agent: PostmanRuntime/7.26.8
Accept: */*
Postman-Token: 8eb35475-d46b-4d3c-a12a-498e887c2ab6
Host: localhost:3000
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Content-Type: application/x-www-form-urlencoded
Content-Length: 53

id=1111s1&username=s&password=789111111&email=&phone=                          <------

HTTP/1.1 201 Created
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 4
ETag: W/"4-X/5TO4MPCKAyY0ipFgr6/IraRNs"
Date: Sat, 23 Jan 2021 05:31:32 GMT
Connection: keep-alive
```

