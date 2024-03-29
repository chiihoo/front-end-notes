`React`的加载和更新过程是同步的，当React要加载或更新组件树时，~~它要调用各组件的生命周期函数，计算对比虚拟`DOM`，还要更新`DOM`树，而这整个过程是同步进行的。~~ 一旦开始了加载或更新，这个过程是不能被中断的，直到任务完成才能空出线程。

这就导致了当组件树比较庞大的时候，比如说现在有200个组件要更新，花销是`200ms`，在这`200ms`期间，如果用户往`input`输入了文字，那页面也是不会得到响应的，因为浏览器的主线程被`React`占着呢，等`200ms`过去，输入的文字就一下子就全显示了。这就导致了页面卡顿。



https://segmentfault.com/a/1190000018250127

**大量的同步计算任务阻塞了浏览器的 `UI` 渲染。默认情况下，`JS` 运算、页面布局和页面绘制都是运行在浏览器的主线程当中，他们之间是互斥的关系。如果 JS 运算持续占用主线程，页面就没法得到及时的更新。当我们调用`setState`更新页面的时候，React 会遍历应用的所有节点，计算出差异，然后再更新 UI。整个过程是一气呵成，不能被打断的。如果页面元素很多，整个过程占用的时机就可能超过 16 毫秒，就容易出现掉帧的现象。**



所以就有了`React Fiber`，它将一个耗时长的任务进行分片，每个小片的时间很短，这样就给其他的任务一个执行的机会。

`React Fiber`把更新过程碎片化，每执行完一小段更新过程，就把控制权交还给`React`负责任务协调的模块，看看有没有其他高优先级的任务要做。优先级高的任务（如键盘输入）可以打断优先级低的任务（如Diff）的执行。



对此，`React`设计了两个阶段：

**第一阶段**：`React Fiber`生成 `Fiber` 树，得出需要更新的节点信息，这个阶段是渐进的，可以被打断。

**第二阶段**：`React`会一鼓作气的把`DOM`树更新完，不会被打断。



**在React Fiber中，第一阶段的生命周期函数在一次加载和更新过程中可能会被多次调用！**

像`componentWillxxxxx`这种的生命周期函数就变得不安全，因此在v16版本就被弃用了

`UNSAFE_componentWillMount`
`UNSAFE_componentWillUpdate`
`UNSAFE_componentWillReceiveProps`

https://blog.csdn.net/qq1498982270/article/details/98969259



![](https://img-blog.csdnimg.cn/20191222212741273.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dscWRidHg=,size_16,color_FFFFFF,t_70)

这颗Fiber树的每个节点通过child、sibling、return来相互连接，最后构成一个虚拟DOM树。

sibling [ˈsɪblɪŋ] 兄、弟、姐、妹