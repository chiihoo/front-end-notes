



vue3相比vue2在编译模板的时候做了优化，vue2对于完全静态的结点仍然会进行diff，而vue3在编译模板的时候，对于非静态结点，_createVNode第四个参数会有不同的值，比如text为1，class为2，props为8，text和props都有就为9，简单的通过按位与运算即可。只有带这个参数的，才会被真正的追踪，静态节点不需要遍历。diff的时候只需要按照对应的值进行比较就行了。















Vue3新增了**Composition API**



```js
setup(props, context) {
	// 只有这三个属性
	context.emit()
	context.slots
	context.attrs // 包含所有父组件传递的方法和属性, 也包括class和style
}
// 在组件created之前执行setup一次
```

ref：包装基本数据类型    fooRef.value调用

reactive：包装引用数据类型

shallowRef、shallowReactive 只让第一层的数据响应式

toRef：为原来响应式对象的某个属性创建一个ref，并会保持对原属性的引用

toRefs：将响应式对象转换为普通对象，并将里面的所有属性都转为原来响应式对象对应属性的ref

```js
const state = reactive({
  foo: 1,
  bar: 2
})

const fooRef = toRef(state, 'foo')

fooRef.value++
console.log(state.foo) // 2

state.foo++
console.log(fooRef.value) // 3
```

```js
function useFeatureX() {
  const state = reactive({
    foo: 1,
    bar: 2
  })

  // 操作 state 的逻辑

  // 返回时转换为ref
  return toRefs(state)
}

export default {
  setup() {
    // 可以在不失去响应性的情况下解构
    const { foo, bar } = useFeatureX()

    return {
      foo,
      bar
    }
  }
}
```

**toRaw**可以返回reactive或readonly代理的**原始对象**

**markRaw**标记一个对象，使其永远也不会转为proxy

```
const foo = {}
const reactiveFoo = reactive(foo)

console.log(toRaw(reactiveFoo) === foo) // true
```







**watch和watchEffect**

**watch跟以前vue2是差不多的**

```js
// 侦听一个 getter
const state = reactive({ count: 0 })
watch(
  () => state.count,
  (count, prevCount) => {
    /* ... */
  }
)

// 直接侦听ref
const count = ref(0)
watch(count, (count, prevCount) => {
  /* ... */
})
```

**watchEffect则是自动进行响应式追踪依赖，并在依赖变更时重新运行，使用`onInvalidate`函数来清除副作用（在所有组件update之前执行）**

```js
const stop = watchEffect(() => {
    onInvalidate(() => {
		// 清除副作用
    })
})
stop()


第二个参数是options对象，flush默认为'pres'
// 在组件更新后触发，这样你就可以访问更新的 DOM。
// 注意：这也将推迟副作用的初始运行，直到组件的首次渲染完成。
watchEffect(
  () => {
    /* ... */
  },
  {
    flush: 'post'
  }
)

```





**provide/inject**

```
vue2
父组件
export default {
    provide: {
        location: 'North Pole',
        geolocation: {
            longitude: 90,
            latitude: 135
        }	
    }
}
子孙组件
export default {
  inject: ['location', 'geolocation']
  通过this.location调用
}
```

```
vue3
父组件
setup() {
    provide('location', 'North Pole')
    provide('geolocation', {
        longitude: 90,
        latitude: 135
    })
}
子孙组件
setup() {
	// 第二个值为默认值
    const userLocation = inject('location', 'The Universe')
    const userGeolocation = inject('geolocation')
}
```

**Readonly**

```
跟const的区别在于，const只是保持对象的引用，可以修改对象里面的值
而Readonly是递归的把对象的每个深层属性都设置为可读
shallowReadonly只使自身属性设置为可读，不执行深度递归
```

