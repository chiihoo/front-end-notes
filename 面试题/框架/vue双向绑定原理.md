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



在编译html的时候，会发现有节点使用了绑定的数据，这时候需要为这个数据注册一个发布订阅中心Deps，并且通过`Object.defineProperty`或者`Proxy`来对每个使用了这个数据的结点进行劫持或者是代理，当getter的时候，会将这个结点订阅进Deps的队列里面，当更新data中的数据时，就触发了setter，会分发消息，通知队列里的所有结点，更新数据。

