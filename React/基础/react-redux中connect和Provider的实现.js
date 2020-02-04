// Provider.js
import React from 'react'
// @一般指向src文件，需要看具体配置
import store from '@/store'
import { connect } from 'react-redux'

// {/* <Provider store={store}><App /></Provider>  */}

const storeContext = React.createContext(store)

// props.children 根据子节点的个数，它的类型有可能是 undefined 或者 object 或者 Array， 不能map
// React.Children.map(children, function[(thisArg)]) 在 children 里的每个直接子节点上调用一个函数，并将 this 设置为 thisArg。
function Provider(props) {
  return (
    <storeContext.Provider value={props.store}>
      {React.Children.map(props.children, children => children)}
    </storeContext.Provider>
  )
}

// connect.js

import { useContext, useEffect } from 'react'
// connect(mapStateToProps, mapDispatchToProps)(App) 高阶函数
// WrapComp即传入的App组件，再返回一个向props中注入了state
const connect = (mapStateToProps, mapDispatchToProps) => WrapComp => props => {
  const store = useContext(storeContext)

  // 这里仅用于使组件重新渲染
  const [r, setR] = useState(0)
  useEffect(() => {
    // subscribe()可以监听每次的修改情况，每次对store进行dispatch(action)时都会触发subscribe注册的函数调用
    store.subscribe(() => {
      setR(r + 1)
    })
  })

  // mapStateToProps和mapDispatchToProps这两个函数传入的参数分别是state和dispatch
  const state = mapStateToProps(store.getState())
  const dispatch = mapDispatchToProps(store.dispatch)

  // 把children从props中解构出来
  const { children, ...props2 } = props

  return (
    <WrapComp {...props2} {...state} {...dispatch}>
      {children}
    </WrapComp>
  )
}
