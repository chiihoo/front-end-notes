**Mobx5**

```
@observable:定义变量
@action:唯一可以修改 @observable定义的全局变量的函数
@computed:可以获取全局变量并计算值

用flow来进行异步操作

runInAction(()=>{})
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

