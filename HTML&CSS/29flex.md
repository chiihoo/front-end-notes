https://www.cnblogs.com/qcloud1001/p/9848619.html


**justify-content**主轴上的对齐方式
  * flex-start
  * flex-end
  * center
  * space-between
  * space-around


**align-content**交叉轴上(多行)的对齐方式
  * stretch
  * flex-start
  * flex-end
  * center
  * space-between
  * space-around
**align-items**交叉轴上(单行)的对齐方式
  * stretch
  * center
  * flex-start
  * flex-end
  * baseline
**align-self**单独为某元素设置对齐方式
  * auto
  * stretch
  * center
  * flex-start
  * flex-end
  * baseline


**flex-direction**修改主轴方向
  * row
  * row-reverse
  * column
  * column-reverse
**flex-wrap**折行
  * nowrap
  * wrap
  * wrap-reverse
**flex-flow**上面两个的简写
  * flex-flow: row wrap;


**flex-glow**空间剩余时的放大比例
  * 默认为0,即如果存在剩余空间，也不放大
**flex-shrink**空间不足时的缩小比例
  * 默认为1,即如果空间不足，该项目将缩小。
**flex-basis**缩放前的原始尺寸.
  * 数值与主轴的width一致
**flex**上面三个属性的简写
  * flex: 0 1 100px;


**order**数值越小越靠前
  * -1,0,1...