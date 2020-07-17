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

![image](https://user-gold-cdn.xitu.io/2018/4/1/16280300d2cbc0ad?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

![image](https://user-gold-cdn.xitu.io/2018/10/19/16689fc91c1a208c?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

---

**offsetLeft、offsetTop** 是盒子与**最近定位父级元素**的左边界与顶部的距离，不包括 border
**clientLeft、clientTop**的用法与 offsetLeft **截然不同**，它表示盒子的左边框与顶部边框 **border** 的宽度
**style.left** 是带有单位的字符串，并且可写
![image](https://user-gold-cdn.xitu.io/2018/4/1/162804163d195550?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

![image](https://user-gold-cdn.xitu.io/2018/10/19/16689fc940840f4b?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
![image](https://user-gold-cdn.xitu.io/2018/10/19/16689fc91e35358e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

---

**scrollTop、scrollLeft、scrollWidth、scrollHeight**

![image](https://user-gold-cdn.xitu.io/2018/4/1/1628055d0479d7c5?imageslim)

---

**event.clientX、event.clientY、event.pageX、event.pageY**

event.clientX 是目标点距离浏览器可视范围的 X 轴坐标
event.clientY 是目标点距离浏览器可视范围的 Y 轴坐标
event.pageX  是目标点距离 document 最左上角的 X 轴坐标
event.pageY 是目标点距离 document 最左上角的 Y 轴坐标

**touchstart 和 touchmove 都可以 e.touches[0].clientX，touchend 则不可以**
![image](https://user-gold-cdn.xitu.io/2018/4/1/1628064e83bb382a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)