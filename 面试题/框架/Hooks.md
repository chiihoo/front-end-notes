`Hooks`是用`Object.is(a, b)`来对依赖进行比较的，它跟`===`很像，但是它会认为`+0`与-`0`是不同的，并且认为`NaN`和`NaN`是相同的



**`useEffect`和`useLayoutEffect`**

https://www.cnblogs.com/iheyunfei/p/13065047.html

默认情况下，`useEffect` 将在每轮渲染结束后执行。

与`componentDidMount`和`componentDidUpdate`不同的是，浏览器会延迟调用`useEffect`，因此不应在函数中执行阻塞浏览器更新屏幕的行为，比如修改`dom`



**这里先是修改虚拟`dom`树，再设置到真实`dom`树上，由于 JS 线程和浏览器渲染线程，即使内存中的真实`dom`已经发生变化，浏览器也没有立刻渲染到屏幕上**



**`useLayoutEffect`才是跟`componentDidMount`和`componentDidUpdate`等价的，它在浏览器绘制之后是同步执行的**，所以修改`dom`的操作要放到`useLayoutEffect`中去



**当内存中的真实`dom`已经修改，但浏览器的渲染线程仍处于阻塞状态，还没有回流重绘，由于内存中的`dom`结点已经被修改，可以通过`useLayoutEffect`拿到最新的`dom`结点，进行修改后，这些更改会和`react`做的修改一同被渲染到屏幕上**

```
useEffect(() => {
	doSomething(a, b)
	return () => {
		清除副作用
	}
},[a, b])
useLayoutEffect(() => {
	doSomething(a, b)
	可以做dom操作
	return () => {
		清除副作用
	}
},[a, b])
```



**`useState`**

```
const [count, setCount] = useState(1)
惰性初始 state
const [count, setCount] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
})
setCount(prevCount => prevCount - 1)
setCount(0)
useState 不会自动合并更新对象
```



**`useReducer`**

```
const initialState = { count: 0}

const reducer = (state, action) => {
	switch(action.type) {
		case 'INCREASE':
			return {count: state.count + 1}
		case 'DECREASE':
			return {count: state.count - 1}
		default:
			thow new Error()
	}
}

function Counter() {
	const [state, dispatch] = useReducer(reducer, initialState)
	
	return (<>
		<button onClick={() => dispatch({type: "INCREASE"})}>+</button>
		<button onClick={() => dispatch({type: "DECREASE"})}>+</button>
	</>)
}

也可以惰性初始化
const init = (initialCount) => {
  return {count: initialCount};
}
function Counter() {
	const [state, dispatch] = useReducer(reducer, initialCount, init)
	return (<>1</>)
}

```



**`useContext`**

```
const context = useContext(MyContext)
接收context
```

```
const MyContext = React.createContext('2')

<MyContext.Provider value='6'>
	xxx
</MyContext.Provider>


<MyContext.Consumer>
	{value => xxx}
</MyContext.Consumer>
或者
class ChildCom extends React.Component{
	static contextType = MyContext
	render() {
		let value = this.context
	}
}
写在外面也行 ChildCom.contextType = MyContext
```



**`useImperativeHandle`**

用于与`forwardRef`一起使用的

可以将父子间的ref和子组件的ref进行隔离

```
const Foo = React.forwardRef((props, ref) => {
	const inputRef = useRef()
	useImpertiveHandle(ref, () => {
		return {
			focus: inputRef.current.focus()
		}
	})
	return <input ref={inputRef}/>
})

父组件
<Foo ref={FaRef}>
通过FaRef.current.focus()进行调用
```



**`useRef`**

```
const callbackRef = useRef()
```





**`useCallback`**

```
let memoizedCallback = useCallback(() => {
	doSomething(a, b)
},[a, b])
```



**`useMemo`**

```
const memoizedValue = useMemo(() => {
	return computeExpensiveValue(a, b)
}, [a, b])
```













