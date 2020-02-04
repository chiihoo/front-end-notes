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
    // ADD_TODO即字符串'ADD_TODO'，全部存在了action中，这不是必须的
    case ADD_TODO:
      return produce(state, state => {
        state.todos.push({ id: Date.now().toString(16), content: action.content, complete: false })
      })
    default:
      return state
  }
}

//或者这样写
// const mutations = {
//   ADD_TODO: produce((state, action) => {
//     state.todos.push({ content: action.content, complete: false })
//   })
// }
// const todoList = (state = initState, action) => {
//   const mutation = mutations[action.type]
//   if (mutation) {
//     return mutation(state, action)
//   } else {
//     return state
//   }
// }

// 可以合并多个reducer
const reducers = combineReducers({ todoList })

export default reducers
