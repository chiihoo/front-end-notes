```
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

<Router>
    <Suspense fallback={<div>Loading...</div>}>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
        </Switch>
    </Suspense>
</Router>
```





原理用到了componentDidCatch生命周期函数

如果一个 class 组件中定义了 static getDerivedStateFromError或 componentDidCatch这两个生命周期方法中的任意一个（或两个）时，那么它就变成一个错误边界



1. **当父组件渲染到子组件时发现了异步请求，直接抛出错误，捕获的对象是一个Promise对象**
2. **当componentDidCatch生命周期函数捕获到这个Promise对象，pending的状态就渲染fallback**
3. **当resolved状态的时候就重新render，遇到下一个异步请求就重复上面步骤**
4. **整个父组件抛出的Promise都为resolved状态，就把fallback组件替换为真正的组件**

