我想在 axios 拦截器里面使用 react-router-dom 的 history 来进行跳转，
我本来是这样做的：

```
路由界面

<BrowserRouter>
  <Switch>
    <Route path="/login">
      <Login />
    </Route>
    <Route path="/admin">
      <Admin />
    </Route>
    <Route path="/">
      <Login />
    </Route>
  </Switch>
</BrowserRouter>
```

```
拦截器 http.js

import { createBrowserHistory } from 'history'
const history = createBrowserHistory()
const http = axios.create({
  baseURL: 'http://localhost:3001/admin/api'
})
http.interceptors.response.use(
  res => {
    return res
  },
  err => {
    if (err.response.data.message) {
      message.error(err.response.data.message)
      if (err.response.status === 401) {
        history.push('/login') // 只会修改url，但不会跳转
        // window.location.href = '/login'
      }
    }
    return Promise.reject(err)
  }
)
```

然而，只会修改 url，但不会真的跳转

这是什么原因呢？
这是因为BrowserRouter 组件相当于 Router 组件 + BrowserHistory，
而 http.js 中又生成了一个新的 BrowserHistory 对象，
这是两个不同的history，因此不会造成路由跳转。

怎么解决这个问题呢？
只需要把 BrowserRouter 的 history 抽离出来即可：

```
<BrowserRouter></BrowserRouter>
```

等价于

```
import { createBrowserHistory } from 'history'
const history = createBrowserHistory()
<Router history={ history }></Router>
```

我们只要把这个生成的 history 对象导出到拦截器中使用即可，
具体代码如下：

```
history.js

import { createBrowserHistory } from 'history'
const history = createBrowserHistory()
export default history
```

```
路由界面

import history from './history'

<Router history={history}>
  <Switch>
    <Route path="/login">
      <Login />
    </Route>
    <Route path="/admin">
      <Admin />
    </Route>
    <Route path="/">
      <Login />
    </Route>
  </Switch>
</Router>
```

```
拦截器 http.js

import history from './history'

http.interceptors.response.use(
  res => {
    return res
  },
  err => {
    if (err.response.data.message) {
      message.error(err.response.data.message)
      if (err.response.status === 401) {
        history.push('/login')
      }
    }
    return Promise.reject(err)
  }
)

```
