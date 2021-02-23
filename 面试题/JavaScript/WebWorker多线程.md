`index.js`

```html
<!DOCTYPE html>
<html>
<head lang="en">
  <meta charset="UTF-8">
  <title></title>
</head>
<body>
  <script src="./Fthread.js"></script>
</body>
</html>
```



`Fthread.js` 主线程

```
let worker = new Worker('./worker.js')

worker.postMessage('foo')  // 主线程向worker发消息

worker.onmessage = function(e) { // 主线程监听worker发来的消息
	console.log(e.data)
	worker.terminate() // 关闭worker
}

myWorker.onerror = (err) => {
  // 错误处理
}
```

`worker.js` worker

```
self.onmessage = function(e) {
	// 收到主线程传来的数据后，进行复杂处理，再用postMessage()把结果传回主线程
	let newData = handle(e.data)
	slef.postMessage(newData)
	
	slef.close() // 结束自身线程
}
```

