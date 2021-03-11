**BFC为块级格式化上下文，相当于一个封闭的盒子，盒子里面与外面的布局是互不影响的**



满足以下任意条件即可：

* float不是none

* position是absolute、fixed、sticky
* display是block、inline-block
* overflow不是visible



BFC渲染规则：

* BFC是一个独立的区域，区域内外的元素互不影响

* BFC区域不会跟浮动元素相重叠
* 计算BFC的高度时，会将内部浮动元素的高度也计算进去
* 同一个BFC内部的元素会有

