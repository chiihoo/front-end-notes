像 offsetWidth、clientWidth、scrollWidth 的值都是整数
而 **getBoundingClientRect()** 会返回数值为小数的 DOMRect 对象
除了 width 和 height 以外的属性是相对于视图窗口的左上角来计算的

```
const rect = dom元素.getBoundingClientRect()
结果为：
rect ->
{
  bottom: 553.0500249862671
  height: 11.83750057220459
  left: 76.0625
  right: 367.9375
  top: 541.2125244140625
  width: 291.875
  x: 76.0625
  y: 541.2125244140625
}
```

这里的 **left、right** 指的是盒子左右边框到**视口左边**的距离
**top、bottom** 指的是盒子上下边框到**视口顶部**的距离
![image](https://mdn.mozillademos.org/files/15087/rect.png)

**getClientRect()**
由于行内元素有时会自动换行，getClientRect()会根据行内元素的换行，将其分成多个 DOMRect 对象，最后返回一个 DOMRect 对象的集合 DOMRectList 对象
而 getBoundingClientRect()对行内元素和块元素都是一视同仁的，只会返回一个 DOMRect 对象

---

**offsetWidth || offsetHeight** = content+ padding + border
包含边框
**contentWidth || contentHeight** = content +padding
不包含边框

是可见区域的宽度，如果一个盒子比屏幕大，导致出现滚动效果，那么offsetWidth都只是可见范围内的宽，

比如判断一个盒子是否滚动到底部：

scrollRef.current.scrollTop + scrollRef.current.offsetHeight + 5 >=scrollRef.current.scrollHeight

因为touch事件拿到的这些数据计算不会恰巧相等，所以就用不等来消除误差。

![image](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/2/1/168a81d009fbe55a~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)

![image](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/2/1/168a81d5f2b9a610~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)

---

**offsetLeft、offsetTop** 是盒子与**最近定位父级元素**的左边界与顶部的距离，不包括 border
**clientLeft、clientTop**的用法与 offsetLeft **截然不同**，它表示盒子的左边框与顶部边框 **border** 的宽度
**style.left** 是带有单位的字符串，并且可写
![image](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/4/1/162804163d195550~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)



![image](https://img-blog.csdnimg.cn/e1986c3935a44fb6931e6ca75ac54b38.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5bCP6IuPKMK677mDwrrCoCk=,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

---

**scrollTop、scrollLeft、scrollWidth、scrollHeight**

![image](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/4/1/1628055d0479d7c5~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)

---

**event.clientX、event.clientY、event.pageX、event.pageY**

event.clientX 是目标点距离浏览器可视范围的 X 轴坐标
event.clientY 是目标点距离浏览器可视范围的 Y 轴坐标
event.pageX  是目标点距离 document 最左上角的 X 轴坐标
event.pageY 是目标点距离 document 最左上角的 Y 轴坐标

**touchstart 和 touchmove 都可以 e.touches[0].clientX，touchend 则不可以**
![image](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/4/1/1628064e83bb382a~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)