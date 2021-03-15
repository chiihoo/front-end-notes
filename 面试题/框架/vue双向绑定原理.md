通过发布订阅模式实现的

`vue2: defineProperty`

`vue3: proxy`





```
<input :value='foo' />
<span>{{foo}}</span>

data(){
	return {foo:'5'}
}
```

上面改变input，来修改data中的数据

原理是`@input="this.foo = $event.target.value"`



而修改好了data中的数据，怎么样同步修改到视图中呢？



**`Vue`会为data中的数据注册一个发布订阅中心Deps，**
**通过`Object.defineProperty`或者`Proxy`来进行劫持或者是代理，当getter的时候，会将使用这个数据的结点订阅进Deps的队列里面，**
**当更新data中的数据时，就触发了setter，会分发消息，通知队列里的所有结点，更新数据。**

**解析模板，当结点含有v-bind属性的时候，也会添加事件监听器，来将该目标元素的值赋值到对应数据**









当你把一个普通的 JavaScript 对象传入 Vue 实例作为 `data` 选项，Vue 将遍历此对象所有的 property，并使用 [`Object.defineProperty`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 把这些 property 全部转为 [getter/setter](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Working_with_Objects#定义_getters_与_setters)。`Object.defineProperty` 是 ES5 中一个无法 shim 的特性，这也就是 Vue 不支持 IE8 以及更低版本浏览器的原因。

这些 getter/setter 对用户来说是不可见的，但是在内部它们让 Vue 能够追踪依赖，在 property 被访问和修改时通知变更。这里需要注意的是不同浏览器在控制台打印数据对象时对 getter/setter 的格式化并不同，所以建议安装 [vue-devtools](https://github.com/vuejs/vue-devtools) 来获取对检查数据更加友好的用户界面。

每个组件实例都对应一个 **watcher** 实例，它会在组件渲染的过程中把“接触”过的数据 property 记录为依赖。之后当依赖项的 setter 触发时，会通知 watcher，从而使它关联的组件重新渲染

![](https://cn.vuejs.org/images/data.png)