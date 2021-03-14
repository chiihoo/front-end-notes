以setInterval为例

```
const [count, setCount] = useState(0)
useEffect(()=>{
	let timer = setInterval(() => {
		setCount(count + 1)
	}, 1000)
	return () => clearInterval(timer)
})
```

如果有其他频繁渲染的状态的话，以上代码可能永远也得不到执行，因为生成之后马上又清除掉了

之后我们加个依赖性`[]`

```
const [count, setCount] = useState(0)
useEffect(()=>{
	let timer = setInterval(() => {
		setCount(count + 1)
	}, 1000)
	return () => clearInterval(timer)
}, [])
```

会发现count变为1，之后就不动了，为什么？因为`setInterval`一直引用的是第一次渲染时的count



两种修复方法：

1. `setCount(count => count + 1)`，这种可以读到新的count，但是不能读到新的state
2. `useReducer`，这种方法只是dispatch一个type字符串，dispatch方法是不变的，所以可以放心的使用，但是`useReducer`不能清除副作用，但是可以返回一些新状态来触发清除副作用



**这个闭包是哪里来的？**

**`useEffect`会丢弃上一次的渲染结果，之后生成新的渲染结果，并且绑定新的state和新的props，但是`setInterval`不会丢弃，它会一直引用老的props和state，直到手动将它换掉**

**怎么换？用ref进行切换，相当于保持着引用，但是把引用的值给换掉**



```
import { useRef, useEffect } from 'react'

const useInterval = (callback, delay) => {
  const savedCallback = useRef()

  useEffect(() => {
    savedCallback.current = callback
  })

  useEffect(() => {
    if (delay !== null) {
      const id = setInterval(() => savedCallback.current(), delay)
      return () => {
        clearInterval(id)
      }
    }
  }, [delay])
}

export default useInterval

```

