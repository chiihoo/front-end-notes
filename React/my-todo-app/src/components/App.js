import React from 'react'
import { useState } from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../store/actions'

const App = props => {
  const [inputValue, setInputValue] = useState('')
  // console.log('App->props', props)
  return (
    <div>
      <h1>Todo</h1>
      <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} />
      <button onClick={() => props.handleAddTodo(inputValue)}>添加</button>
    </div>
  )
}

// mapStateToProps
// state参数是todoList：{state的数据}，即总体的数据。（注：todoList是reducer的名字）
// 用到了总体state数据的哪些，就写在返回对象的属性上，它会被注入到props中去
const mapStateToProps = state => {
  // console.log('connect->state', state)
  return {
    todos: state.todoList
  }
}

// mapDispatchToProps
// 会把返回对象的属性，全部注入到props中去
// 可以仅返回一个{dispatch:dispatch}，之后在组件内部写个handleAddTodo = inputValue => { dispatch({ type: 'ADD_TODO', content: inputValue }) }，并通过按钮点击触发
// 这里的写法就是把组件内部的handleAddTodo提出来放在mapDispatchToProps里面，这样组件内部就是直接调用props上的handleAddTodo方法就可以了
const mapDispatchToProps = dispatch => {
  // console.log('connect->dispatch', dispatch)
  return {
    handleAddTodo: inputValue => {
      console.log('ha...')
      // reducer里面的操作
      dispatch(addTodo(inputValue))
      // dispatch({ type: 'add', content: inputValue })
    }
  }
}

// connect方法就是一个高阶函数，传入App组件，之后把mapStateToProps, mapDispatchToProps返回的两个对象的可枚举属性全部注入到props上面
// 这样就让App组件既能拿到mapStateToProps传来的state值，也可以拿到mapDispatchToProps传来的dispatch方法（一般直接封装成组件内部要使用的函数）
export default connect(mapStateToProps, mapDispatchToProps)(App)
