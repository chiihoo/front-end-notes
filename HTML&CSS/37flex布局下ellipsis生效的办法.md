flex 布局下，对文本应用 text-overflow: ellipsis 会无法正常显示省略号

flex 的子元素如果没有定宽的话，overflow: hidden 是不会生效的

但是直接定宽的话，宽度是定死的，怎么样自适应宽度呢？

```
.flex-item {
  min-width: 0;
  flex-grow: 1
}
```

用 overflow: hidden 貌似也可以

```
.flex-item {
  overflow: hidden;
  flex-grow: 1
}
```
