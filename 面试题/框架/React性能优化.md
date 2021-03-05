

```
默认是做浅比较的
React.PureComponent

返回true更新
shouldComponentUpdate(nextProps, nextState){}

默认是做浅比较的
React.memo(组件)

返回false更新
React.memo(组件, (prevProps, nextProps) => {})

```



但由于state是不可变数据，每次操作都谨记这点，就完全不会有问题

```
this.setState({...state, a:{...state.a, b:7}})
```

