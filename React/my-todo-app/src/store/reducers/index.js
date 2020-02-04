import { combineReducers } from 'redux'
import produce from 'immer'
import { ADD_TODO } from '../actions/index'

const initState = {
  todos: [],
  filter: 'all' //all,complete,active
}

// 这是reducer
const todoList = (state = initState, action) => {
  switch (action.type) {
    // ADD_TODO即字符串'ADD_TODO'，全部存在了action中
    case ADD_TODO:
      return produce(state, state => {
        state.todos.push({ content: action.content, complete: false })
      })
    default:
      return state
  }
}

// 可以合并多个reducer
const reducers = combineReducers({ todoList })

export default reducers
