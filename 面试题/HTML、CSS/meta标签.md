* **charset指定html文档的编码格式**

`<meta charset="utf-8">` 



* **name和content指定了元数据的名称和内容**

**author页面的作者**

`<meta name="author" content="chiihooy">`

**keywords为搜索引擎提供关键词**

`<meta name="keywords" content="HTML, CSS, JavaScript">`

**description对网页的整体描述**

`<meta name="description" content="My tutorials on HTML, CSS and JavaScript">`

**viewport 对页面视图进行描述**

`<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minmum-scale=1.0">`

主要包括：

1. `width=device-width` 将页面宽度设置为跟随屏幕宽度变化而变化

2. `initial-scale=1.0` 设置浏览器首次加载页面时的初始缩放比例，取值为0.0~10.0
3. `maximum-scale=1.0` 允许用户缩放的最大比例，取值为0.0~10.0，必须大于`minimum-scale``
4. ``minimum-scale=1.0` 允许用户缩放的最小比例，取值为0.0~10.0，必须小于`maximum-scale`
5. user-scalable=no` 是否允许用户手动缩放

**robot 可以告知搜索引擎该页面是否希望被抓取**

`<meta name="robot" content="all|none|index|noindex|follow|nofollow>`



* **http-equiv和content**

`<meta http-equiv="X-UA-Compatible" content="ie=edge">`

**ie=edge告诉IE使用最新的引擎渲染网页**

chrome=1则可以激活Chrome Frame，chrome=1不是说IE的技术增强了可以模拟Chrome浏览器，而是与谷歌开发的Google Chrome Frame(谷歌内嵌浏览器框架GCF)有关。这个插件可以让用户的IE浏览器外观不变，但用户在浏览网页时实际上使用的是Chrome的内核，并且支持Windows XP及以上系统的IE6/7/8。



`<meta http-equiv="Cache-Control" content="no-cache">` 设置缓存策略

`<meta http-equiv="Expires" content="Mon,12 May 2001 00:20:00 GMT">` 设置网页过期时间



`<meta http-equiv="refresh" content="5"> ` 5秒后刷新该页面

`<meta http-equiv="refresh" content="5;url=http://www.baidu.com">` 5秒后跳转到`http://www.baidu.com`