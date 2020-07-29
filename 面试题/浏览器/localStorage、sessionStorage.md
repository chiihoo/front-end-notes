* **localStorage**

理论上永久有效，除非主动清除

键值对均为字符串，存储对象要用 Json.stringify()，读取对象要用 Json.parse()

存储容量为4.98M，safari为2.49M

* **sessionStorage**

仅在当前网页会话有效，关闭页面或者关闭浏览器后会被清除

存储容量为4.98M



注：cookie的存储容量为4kb左右



```javascript
localStorage.setItem('name1', Json.stringify({v1: 5, v2: {c: 7}})

const v = Json.parse(localStorage.getItem('name1'))
```





