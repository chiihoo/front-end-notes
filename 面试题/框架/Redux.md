**Redux**

```
设计理念
redux是一个状态管理库，它可以分为很多模块，每个模块有自己的state和reducer，reducer就是对state进行操作的一个处理中心。之后将每个reducer用combineReducers进行合并，再用createStore(reducers)创建一个全局的store。

将整个应用的state都存储在这个全局的store中，组件可以通过dispatch一个action给这个store，store再传给reducer, reducer处理完对应state后再传给store，其中action.type的名字应该是全局唯一的。

store对象被全局的分发，组件可以通过connect来获取这个store对象，通过store.getState()和store.dispatch来获取state存储和dispatch函数，通过传入的mapStateToProps和mapDispatchToProps提取要用到的state与封装了dispatch的方法
```



```
用的是发布订阅模式

每个模块都有一个局部state,一个reducer

export const initState = {
	todoList: [],
  	bannerList: [],
}
----------------------------------------
reducer存储了 不同action.type情况下对state的操作
通过dispatch({type:'ADD_TODO', data：{xxx}})触发reducer,同时可通过action.data来读取传递的参数

const TodoReducer = (state = initState, action) => {
  	switch (action.type) {
  		// 这里用了immer,常规操作应为{...state, bannerList: action.data.content}
    	case 'ADD_TODO':
      		return produce(state, state => {
        		state.todoList = action.data.content
        	})
		default:
			return state
}

----------------------------------------
在最外层通过Provider组件下发,给这个TodoReducer取名为TodoRDC
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const reducers = combineReducers({ TodoRDC: TodoReducer })
const store = createStore(reducers, applyMiddleware(thunk))
<Provider store={store}>
    <App />
</Provider>

Provider实现为
const storeContext = React.createContext(store)
function Provider(props) {
	return (
        <storeContext.Provider value={props.store}>
          	{React.Children.map(props.children, children => children)}
        </storeContext.Provider>
  )
}


----------------------------------------

在class组件中，需要connect(mapStateToProps, mapDispatchToProps)(组件名)

connect函数，会用const store = useContext(storeContext)获取store
再将mapStateToProps(store.getState())与mapDispatchToProps(store.dispatch)的返回值{...res}注入到组件上

而这两个函数是需要自己实现
const mapStateToProps = state => {
	return {
		todoList: state.TodoRDC.todoList
	}
}
const mapDispatchToProps = dispatch => {
	return {
		handleAddTodo(value) {
			dispatch({ type: 'ADD_TODO', data: { content: value }})
		}
	}
}
即返回的两个对象通过{...obj}挂载在组件上，因此可以直接通过props调用
比如props.todoList和props.handleAddTodo()

----------------------------------------
而在函数组件中，除了通过connect的方式之外还提供了useDispatch和useSelector这两个hooks

const dispatch = useDispatch()
const todoList = useSelector(state => state.TodoRDC.todoList)
可以直接获取dispatch和所需的state

直接通过dispatch({ type: 'ADD_TODO', data: { content: value }})调用或者自行封装成函数

并且如果有复杂操作的话，可以用reselect来做缓存
import { createSelector } from 'reselect'
const selectNewSongAlbum = useMemo(
    () =>
        createSelector(
            state => state.Find.newSongs,
            state => state.Find.newAlbums,
            (newSongs, newAlbums) => ({
                newSongs: chunk(newSongs.slice(0, 6), 3),
                newAlbums: chunk(newAlbums.slice(0, 6), 3)
        	})
        ),
    []
)
const newSongAlbum = useSelector(selectNewSongAlbum)

```



```
Redux-thunk中间件
中间件是派发action到store的这个过程，改造dispatch
action应该是对象，但Redux-thunk怎么实现异步的呢，如果action是一个函数，则调用，并返回结果。否则直接next(action)
这就让dispatch出去的action可以是一个函数，这个函数内部可以写异步操作


实现如下：
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }
    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;

----------------------------------------
示例
const fetchTodo = () => dispatch => {
    getTodo().then(data => {
    	dispatch({ type: '操作A', data })
	})
}}
dispatch(fetchTodo())

下面这个函数即为dispatch出去的action
dispatch => {
    getTodo().then(data => {
    	dispatch({ type: '操作A', data })
	})
}
在到store的途中，先经过thunk中间件处理，如果是函数，则调用并返回
```


