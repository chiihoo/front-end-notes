顶朝上的等腰三角形

```
.triangle1 {
    width: 0px;
    height: 0px;
    /* 不能给另外三条边设置除了transparent以外的颜色，否则图形就变了 */
    /* transparent是透明色，不能跟别的颜色一起用！！！ */
    /* border-top: 0px solid transparent; */
    
    border-right: 100px solid transparent;
    border-bottom: 100px solid greenyellow;
    border-left: 100px solid transparent;
}
```



直角在左下角的直角三角形

```

.triangle2 {
    /* 直角三角形直接把相邻两块设置为相同颜色 */
    width: 0px;
    height: 0px;
    
    border-top: 100px solid transparent;
    border-right: 100px solid transparent;
    border-bottom: 100px solid hotpink;
    border-left: 100px solid hotpink;
}
```



等腰梯形

```
.triangle3 {

    width: 150px;
    
    height: 0px;
    /* border-top: 0px solid transparent; */
    
    border-right: 100px solid transparent;
    border-bottom: 100px solid skyblue;
    border-left: 100px solid transparent;
}
```

