**Mobx5**

```
@observable:定义变量
@action:唯一可以修改 @observable定义的全局变量的函数
@computed:可以获取全局变量并计算值

用flow来进行异步操作

runInAction(()=>{})
```



mobx的原理跟vue很相似，是用的Proxy来对它的state进行代理，之后再组件中需要用的observer，或者想useObserver之类的函数，会触发getter将用到state的节点注册进发布订阅中心，之后当state发生更新的时候，触发setter将最新的数据发布出去







**Vuex**

```
state:相当于mobx的@observable
getters:相当于mobx的@computed
mutations:相当于mobx的@action
actions:mutations只能处理同步的代码，所以官方补充一个actions用于处理异步的代码

action：可以异步，dispatch来操作
mutation：只能同步，commit来操作
```

