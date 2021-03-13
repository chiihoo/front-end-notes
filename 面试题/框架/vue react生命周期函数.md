**React**



首先是组件初始化，super(props)把父组件的props注入到子组件，constructor里面初始化state

组件挂载mount

组件更新update，比较新旧虚拟dom，之后渲染

组件卸载willUnmount



https://react.docschina.org/docs/react-component.html

https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

```
constructor(props){}
render(){}
componentDidMount(){}
shouldComponentUpdate(nextProps, nextState){}
componentDidUpdate(prevProps, prevState, snapshot){}
componentWillUnmount(){}

static getDerivedStateFromProps(props, state)
返回一个对象来更新state,返回null则不更新
适用于state在任何时候都取决于props的罕见情况

getSnapshotBeforeUpdate(prevProps, prevState){}
使组件能在发生更改之前从 DOM 中捕获一些信息（比如滚动位置等），并将此生命周期的任何返回值将作为参数传递给componentDidUpdate的第三个参数
此用法并不常见，但它可能出现在 UI 处理中，如需要以特殊方式处理滚动位置的聊天线程等。
```

过时的方法：

```
UNSAFE_componentWillMount(){}
UNSAFE_componentWillUpdate(nextProps, nextState){}
UNSAFE_componentWillReceiveProps(nextProps){}

弃用的原因为React Fiber
时间分片

第一阶段：React Fiber生成 Fiber 树，得出需要更新的节点信息，这个阶段是渐进的，可以被打断。
第二阶段：React会一鼓作气的把DOM树更新完，不会被打断。

第一阶段的生命周期函数在一次加载和更新过程中可能会被多次调用，因此 以will开头的生命周期函数变得不安全！
```



**Vue**



生命周期：vue创建实例，初始化数据，编译模板，挂载dom和渲染，更新和渲染，卸载

`vue2.6`

```
beforeCreate
created

beforeMount
mounted

beforeUpdate
updated

activated      被keep-alive缓存的组件激活时调用  服务器端渲染期间不被调用
deactivated    被keep-alive缓存的组件停用时调用  服务器端渲染期间不被调用

beforeDestry
destroyed

errorCaptured  当捕获一个来自子孙组件的错误时被调用
```

`vue3`

```
选项式API	              Hook inside (Setup)             

beforeCreate            -----
created                 -----

beforeMount             onBeforeMount
mounted                 onMounted

beforeUpdate            onBeforeUpdate
updated             	  onUpdated

activated
deactivated

beforeUnmount           onBeforeUnmount
unmounted               onUnmounted

errorCaptured           onErrorCaptured     当捕获一个来自子孙组件的错误时被调用

renderTracked           onRenderTracked     跟踪虚拟DOM重新渲染时调用，此事件告诉你哪个操作跟踪了组件以及该操作的目标对象和键。
// onRenderTracked直译过来就是状态跟踪，它会跟踪页面上所有响应式变量和方法的状态，也就是我们用return返回去的值，它都会跟踪。只要页面有update的情况，它就会跟踪，然后生成一个event对象，我们通过event对象来查找程序的问题所在。

renderTriggered         onRenderTriggered   此事件告诉你是什么操作触发了重新渲染，以及该操作的目标对象和键。
// onRenderTriggered直译过来是状态触发，它不会跟踪每一个值，而是给你变化值的信息，并且新值和旧值都会给你明确的展示出来。

也就是onRenderTracked跟踪所有响应式的值，而onRenderTriggered只精确跟踪发生变化的值

```

