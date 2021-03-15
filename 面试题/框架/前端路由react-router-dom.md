分为`BrowserRouter`和`HashRouter`

由于`HashRouter`会在路径上添加`/#/`，而`/#/`后面的所有都不会发送到服务器端，即对于服务器而言，路径依旧是`localhost:3000`，路由切换在前端完成

而`BrowserRouter`，使用的是`History API`，由于它的`url`会改变，所以需要将路由`url`转发到根目录/



```
需要配置nginx

location / {
  try_files $uri $uri/ /index.html;
}
```







`HashRouter`将`window.loacation.hash`跟自己的`state`挂钩，通过改变自己的`state`驱动页面的重新渲染。

`Route`的渲染核心逻辑就是将自己的`path`和当前页面的`hash`进行匹配，匹配上了就渲染相应的元素，匹配不上就什么都不渲染。





https://segmentfault.com/a/1190000014313428





```
import React, { Component } from "react";
import { createBrowserHistory } from 'history'
import {Provider} from '../Context'

class BrowserRouter extends Component {
    constructor(props) {
        super(props)
        this.history = createBrowserHistory()
        this.state = {
            location: this.history.location,
        }
        this.unListen = this.history.listen(location => {
            this.setState({
                location
            })
        })
    }

    componentWillUnmount() {
        this.unListen && this.unListen()
    }
    render() {
        let value = {
            history:this.history,
            location:this.state.location
        }
        return (
            <Provider value={value}>
                {this.props.children}
            </Provider>
        )
    }
}
export default BrowserRouter
```





```
import React, { Component } from 'react';
import {Consumer} from '../Context'
import pathToReg from "path-to-regexp";

class Route extends Component {
    render() {     
        return (
            <Consumer>
                {
                    vaule=>{
                        const {path,component:Component,exact=false}=this.props
                        let pathname=vaule.location.pathname
                        let keys=[]
                        const reg=pathToReg(path,keys,{end:exact})
                        let result=pathname.match(reg)
                        keys=keys.map(item=>item.name)
                        let [url,...vaules]=result
                        let props={
                            history:vaule.history,
                            location:vaule.location,
                            match:{
                                params:keys.reduce((obj,current,index)=>{
                                    obj[current]=vaules[index]
                                    return obj
                                },{})
                            }

                        }
                        if(result){
                            return <Component {...props} />
                        }else{
                            return null
                        }
                       
                    }
                }
            </Consumer>
         
        );
    }
}

export default Route;
```

