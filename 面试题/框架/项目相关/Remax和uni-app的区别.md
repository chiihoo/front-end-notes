## Remax

Remax是蚂蚁金服推出的一个小程序框架，可以用React来写小程序。

说到Remax的原理，首先要了解React的两个包：react-reconciler与react-dom。



**react-reconciler 负责协调：生成Fiber树（React中的虚拟DOM）、协调和调度、产生操作指令。**

**react-dom 负责渲染：调用DOM API，将操作指令实施到DOM树上，可以将 react-dom 类比为 react-reconciler 和 DOM 之间的翻译器。**



**Remax实际上使用了react-reconciler这个包，将React的代码转成了VNode，在浏览器中我们会用到react-dom这个包将VNode翻译成DOM树，但是小程序中没有DOM，取而代之的是小程序的语法，所以需要找个方法将VNode转成小程序语法。**

这里的VNode的结构如下：

```tsx
interface VNode {
  id: number;
  container: Container;
  children: VNode[];
  mounted: boolean;
  type: string | symbol;
  props?: any;
  parent: VNode | null;
  text?: string;
  appendChild(node: VNode): void;
  removeChild(node: VNode): void;
  insertBefore(newNode: VNode, referenceNode: VNode): void;
  toJSON(): RawNode;
}
```

**在React更新完成之后，会调用节点上的toJSON方法，把VNode变成一个JSON对象。**

**之后需要有一个小程序的wxml模板，再通过小程序的setData方法，把VNode这个JSON对象传递给渲染进程，从而将树给渲染出来。**

```
<block a:for="{{root.children}}" a:key="{{item.id}}">
  <template is="{{'REMAX_TPL_' + item.type}}" data="{{item: item}}" />
</block>

<template name="REMAX_TPL_view">
  <view class="{{item.props['className']}}">
    <block a:for="{{item.children}}" key="{{item.id}}">
      <template is="{{'REMAX_TPL_' + item.type}}" data="{{item: item}}" />
    </block>
  </view>
</template>

<template name="REMAX_TPL_text">
  <text>
    <block a:for="{{item.children}}" key="{{item.id}}">
      <template is="{{'REMAX_TPL_' + item.type}}" data="{{item: item}}" />
    </block>
  </text>
</template>

<template name="REMAX_TPL_plain-text">
  <block>{{item.text}}</block>
</template>
```



## uni-app

uni-app做的事则不同，它是将代码直接静态编译成小程序的语法，像什么事件监听啊、数据变更啊，都是小程序原生的。

而在Remax中，是由react-reconciler来做的，包括对VNode的生成与更新，之后再由小程序setData把VNode渲染到小程序中，**在项目庞大时会有性能问题，因为每次都需要用setData重新的渲染整个小程序页面，而小程序原生的语法则可以部分的渲染某个组件。**