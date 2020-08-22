```
// http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html

display: grid;
display: inline-grid;

grid-template-columns: repeat(5, 50px, 1fr, 2fr);  // 一行中每列的占比
grid-template-rows: 100px auto 100px; // 一列中每行的占比，auto表示由浏览器自己决定长度
// repeat第一个参数为重复的次数，后续参数为重复的内容，
// 还可以写成repeat(auto-fill, 100px)，auto-fill表示自动填充
// fr为fraction片段的缩写，表示比例关系

row-gap: 20px;
column-gap: 30px;
gap: 20px 30px; // <row-gap> <column-gap>;
// 最新的标准是上述写法，之前的写法有grid-前缀，grid-row-gap,grid-column-gap,grid-gap,还能用

grid-template-areas: "head head"
                     "nav  main"
                     "nav  foot";
// 给网格区块划分区块
// https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-template-areas

grid-auto-flow: row | column | row dense | column dense
// 先行后列 | 先列后行 | 先行后列 密集型 | 先列后行 密集型，密集型尽可能紧密填满，尽量不出现空格

```



```
justify-items: start | center | end | stretch; // 左中右、拉伸占满单元格宽度
align-items: start | center | end | stretch; // 上中下、拉伸占满单元格高度
place-items: <align-items> <justify-items>; // start end
```

![](https://www.wangbase.com/blogimg/asset/201903/bg2019032516.png)





```
 justify-content: start | center | end | stretch | space-around | space-between | space-evenly;
 align-content: start | center | end | stretch | space-around | space-between | space-evenly;
 place-content: <align-content> <justify-content>; // space-around space-evenly
```

![](https://www.wangbase.com/blogimg/asset/201903/bg2019032519.png)



```
grid-auto-columns
grid-auto-rows
跟grid-template-columns和grid-template-rows的使用方法完全相同
指定的是上述两个没有指定到的行列
```

```
grid-template属性是grid-template-columns、grid-template-rows和grid-template-areas这三个属性的合并简写形式。
grid属性是grid-template-rows、grid-template-columns、grid-template-areas、 grid-auto-rows、grid-auto-columns、grid-auto-flow这六个属性的合并简写形式。
```

```
grid-column-start 左边框在的垂直网格线
grid-column-end 右边框所在的垂直网格线
grid-row-start 上边框所在的水平网格线
grid-row-end 下边框所在的水平网格线

例如
.item-1 {
  grid-column-start: 2;
  grid-column-end: 4;
}

表示item-1盒子的左边框是第2根垂直网格线，右边框是第4根垂直网格线


除此之外，之前写的
grid-template-areas: "head head"
										 "nav  main"
                     "nav  foot";
划分了区块
因此也可以
.item-1 {
  grid-column-start: header-start;
  grid-column-end: header-end;
}

另外还可以使用span关键字，表示左右边框（上下边框）之间跨越多少个网格
.item-1 {
  grid-column-start: span 2;
}
表示item-1盒子的左边框距离右边框跨越2个网格
grid-column-end: span 2;的效果跟grid-column-start: span 2;完全一样

使用这四个属性，如果产生了项目的重叠，则使用z-index属性指定项目的重叠顺序

grid-column属性是grid-column-start和grid-column-end的合并简写形式。
grid-row属性是grid-row-start属性和grid-row-end的合并简写形式。
```

