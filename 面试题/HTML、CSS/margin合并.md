只有块级元素的垂直外边距才会发生margin合并

主要分为

* 兄弟元素
* 父子元素（没有内边距和边框）
* 空元素（没有内边距和边框）

![](https://img-blog.csdn.net/20180503145146517?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NoaV8xMjA0/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

![](https://img-blog.csdn.net/20180503145333478?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NoaV8xMjA0/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

![](https://img-blog.csdn.net/20180503150007411?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NoaV8xMjA0/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

![](https://img-blog.csdn.net/20180503150256387?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NoaV8xMjA0/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)



解决方法：

兄弟元素：

* 一端设置一端不设置，或者用padding

父子元素：

* 给父元素设置border
* 给父元素设置padding
* 让父元素触发BFC，比如overflow: hidden



还有margin塌陷的情况：父子元素，如果margin合并了，并且子元素的margin大于父元素的，这是子元素会带动父元素移动

比如父盒子没有margin，子元素有一个magin-top: 50px;则父子元素都会移动到距离上方50px的地方

