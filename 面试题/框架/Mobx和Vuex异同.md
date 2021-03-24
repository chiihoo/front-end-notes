**Mobx5**

```
@observable:定义变量
@action:唯一可以修改 @observable定义的全局变量的函数
@computed:可以获取全局变量并计算值

用flow来进行异步操作

runInAction(()=>{})
```



mobx的原理跟vue很相似，@observable会使用Proxy来对它的state进行代理，之后在组件中需要用到observer、useObserver函数或Observer组件，它会重写render方法，内部使用Reaction来监听值的变化，如果引用的值发送了变化，就使用forceUpdate来更新组件



会触发getter将用到state的节点注册进发布订阅中心，之后当state发生更新的时候，触发setter将最新的数据发布出去，使用forceUpdate来更新组件





https://segmentfault.com/a/1190000038935080?utm_source=tag-newest

https://github.com/mobxjs/mobx/blob/0945c26513057457e1534a80558a3eb98487dc96/packages/mobx/src/core/reaction.ts#L53

```
observer函数内部会混入生命周期函数，并在 shouldComponentUpdate 生命周期函数中做 shallowEqual，所以当使用 observer 时，不必使用 PureComponent。接下来，重写 render 方法为 makeComponentReactive 函数的返回值。此函数内部通过 Reaction 监听值的变化，如果所引用的值发生变化，便通过 forceUpdate 方法更新组件。
```





**Vuex**

```
state:相当于mobx的@observable
getters:相当于mobx的@computed
mutations:相当于mobx的@action
actions:mutations只能处理同步的代码，所以官方补充一个actions用于处理异步的代码

action：可以异步，dispatch来操作
mutation：只能同步，commit来操作
```

