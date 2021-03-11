```
function f() {
	let prevTime = null
	function step(time) {
		if (prevTime) {
			let timeDiff = time - prevTime
			// 进行需要做的动画操作
		}
		prevTime = time
		if (xxx){ // 不符合条件就不进行下去了
			requestAnimationFrame(step)
		}
	}
	requestAnimationFrame(step)
}
```





```
自定义hooks里面是这样写的

const useRafLoop = (callback, initialActive = true) => {
	const savedCallback = useRef()
	const prevTime = useRef()
	const rafId = useRef()
	const isActive = useRef()
	
	useEffect(() => {
		savedCallback.current = callback
	})
	
	const step = useCallback((time) => {
		if(isActive.current) {
            if (prevTime.current) {
                const timeDiff = time - prevTime.current
            }
            prevTime.current = time
            rafId.current = requestAnimationFrame(step)	
		}
	}, [])
	
	const startRaf = useCallback(() => {
		if(!isActive.current) {
			isActive.current = false
			rafId.current = requestAnimationFrame(step)
		}
	}, [])
	
	const stopRaf = useCallback(() => {
		if (isActive.current) {
			isActive.current = false
			rafId.current && cancelAnimationFrame(rafId.current)
			prevTime.current = null
		}	
	}, [])
	
	useEffect(() => {
		if (initialActive) {
			startRaf()
		}
		return () => stopRaf()
	})
	
	return [stopRaf, startRaf, isActive.current]
}

```

