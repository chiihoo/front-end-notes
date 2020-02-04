import { createStore, compose } from 'redux'
import reducers from './reducers/index'

// 配置调试工具
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducers, composeEnhancers())

export default store
