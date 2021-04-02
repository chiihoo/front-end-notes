z-index只有在定位元素上才会生效，比如`position: relative | absolute | fixed | sticky`

当前结点向上找，找到最近的设置了z-index的定位元素，即为**层叠上下文**

兄弟结点可以直接比较z-index的大小，因为兄弟结点的层叠上下文肯定是同一个。而如果相同，就按照后来者居上的原则。

子元素肯定在父元素上方





**z-index**

**只有在已定位的元素或者是flex子项上生效，z-index不为auto时，可以创建一个新的层叠上下文**

**同一层叠上下文上按照z-index大小排列，相同z-index时后面的大**





![](https://image.zhangxinxu.com/image/blog/201601/2016-01-07_235108.png)