// 在hooks中可以使用useMemo来作为shouldComponentUpdate的替代方案，但useMemo只对props进行浅比较

useMemo(() => <Foo />)
// 相当于
useCallback(<Foo />)

// useMemo: 一般用于缓存组件
// useCallback: 一般用于缓存函数

useMemo(() => fn, deps)
// 相当于
useCallback(fn, deps)
