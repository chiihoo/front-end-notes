// actions文件不是必须的，在小项目里面没有必要把action type常量抽离成单独一个模块，甚至根本不需要定义
// 但在大型应用中把它们显式地定义成常量还是利大于弊的。
export const ADD_TODO = 'ADD_TODO'

// mapDispatchToProps函数里面 dispatch 调用的参数 就是底下 这个函数调用的返回值
export const addTodo = inputValue => {
  return {
    type: ADD_TODO,
    content: inputValue
  }
}
