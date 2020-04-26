// // https://zhuanlan.zhihu.com/p/34038469

// // context的作用是跨层级的从上向下传递状态

// // 创建context，其中此处light为默认值
// // createContext()创建出来的ThemeContext是个对象，它里面有{ Provider: Provider, Consumer: Consumer }
// // ThemeContext.Provide和ThemeContext.Consumer分别代表ThemeContext对象中的两个组件
// const ThemeContext = React.createContext('light');

// // 父组件 包一层Provider，此时context的默认值将修改为value的值
// <ThemeContext.Provider value="dark">
//   <Toolbar />
// </ThemeContext.Provider>

// // 子孙组件中

// // class组件
// static contextType = ThemeContext
// render() {
//   return <Button theme={this.context} />
// }
// // 或者直接包一层Consumer
// render() {
//   return (
//     <ThemeContext.Consumer>
//       { value => <Button theme={value} /> }
//     </ThemeContext.Consumer>
//   )
// }
// // 函数组件
// const theme = useContext(ThemeContext)
// return <Button theme={theme} />



// 简单实现

// context实际上使用的是pub-sub模式，即发布订阅模式
// Consumer组件是订阅者，它把想要订阅的事件（处理context的函数func） 注册（emitter.on()）到调度中心emitter，等待发布者发布数据后，调度中心统一处理
// Provider组件是发布者，当它发布（emitter.emit()）数据（value）时，就依次调用listeners数组中已经注册的func函数（func(value)），
// 这个func函数一般是Consumer组件中的 value=>{this.setState({ value: value })}，这样就可以拿到Provider组件传递下去的数据了

const emitter = {
  listeners: [],
  // 订阅者 注册 处理函数
  on: func => {
    emitter.listener.push(func)
  },
  // 订阅者 解除 注册
  off: func => {
    emitter.listeners.splice(emitter.listeners.findIndex(func),1)
  },
  // 发布者用emit来发布数据，直接把数据传给订阅者已经注册的处理函数，并进行调用
  emit: value => {
    emitter.listener.forEach(func => func(value))
  }
}

function createContext(defaultValue){

  class Provider extends React.PureComponent{
    // 组件加载完毕和更新完毕时，把传进来的value值发布出去
    componentDidMount(){
      emitter.emit(this.props.value)
    }
    componentDidUpdate(){
      emitter.emit(this.props.value)
    }
    render(){
      return this.props.children
    }
  }

  class Consumer extends React.PureComponent{
    constructor(props){
      super(props)
      // 把createContext(defaultValue)传进来的value默认值存起来
      this.setState({ value: defaultValue })
      // 订阅操作，参数为处理context的处理函数，把这整个函数value=>{this.setState({ value: value })}存入emitter.listener中
      emitter.on(value => {
        this.setState({ value: value })
      })
    }
    render(){
      // Consumer组件接收到context的值，传给下层要用到这个值的组件，这种传递props的方式叫render props
      return this.props.children(this.state.value)
    }
  }

  // 返回含有Provider, Consumer两个组件的对象
  return { Provider, Consumer }

}















// 附上完整代码
import React from 'react'
import { render } from 'react-dom'

const styles = {
  light: {
    padding: 20,
    backgroundColor: 'white',
    color: 'black'
  },
  dark: {
    padding: 20,
    backgroundColor: 'black',
    color: 'white'
  }
}

const emitter = {
  listeners: [],
  on: fn => {
    emitter.listeners.push(fn)
  },
  off: fn => {
    emitter.listeners.splice(emitter.listener.findIndex(fn), 1)
  },
  emit: value => {
    emitter.listeners.forEach(fn => fn(value))
  }
}

function createContext(defaultValue) {
  class Provider extends React.PureComponent {
    componentDidUpdate() {
      emitter.emit(this.props.value)
    }

    componentDidMount() {
      emitter.emit(this.props.value)
    }

    render() {
      return this.props.children
    }
  }

  class Consumer extends React.PureComponent {
    constructor(props) {
      super(props)
      this.state = { value: defaultValue }

      emitter.on(value => {
        console.log(value)
        this.setState({ value })
      })
    }

    render() {
      return this.props.children(this.state.value)
    }
  }

  return { Provider, Consumer }
}

const ThemeContext = createContext('light')

// const withContext = Context => WrappedComponent => {
//   class Connected extends React.PureComponent {
//     render() {
//       return (
//         <Context.Consumer>
//           {context => <WrappedComponent {...this.props} context={context} />}
//         </Context.Consumer>
//       )
//     }
//   }

//   Connected.WrappedComponent = WrappedComponent
//   Connected.displayName = `${WrappedComponent.displayName}WithContext(${Context.displayName})`

//   return Connected
// }

// // @是装饰器，通过添加@方法名，可以对一些对象进行装饰包装然后返回一个被包装过的对象，可以装饰的对象包括：类，属性，方法等。
// // 在使用它之前需要引入babel模块 transform-decorators-legacy 编译成 ES5 或 ES6。

// // @withContext(ThemeContext)
// class AppBody2 extends React.PureComponent {
//   render() {
//     console.log('AppBody rendered')
//     const { onClick, context: theme } = this.props

//     return (
//       <div>
//         <button style={styles[theme]} onClick={onClick}>
//           {theme}
//         </button>
//       </div>
//     )
//   }
// }

// console.log(AppBody2)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { theme: 'light' }
    this.toggleTheme = this.toggleTheme.bind(this)
  }

  toggleTheme() {
    console.log(this.state)
    this.setState(
      {
        theme: this.state.theme === 'light' ? 'dark' : 'light'
      },
      () => {
        console.log(this.state)
      }
    )
  }

  render() {
    console.log('app rerender')
    return (
      <div>
        <ThemeContext.Provider value={this.state.theme}>
          <AppBody onClick={this.toggleTheme} />
          {/* <AppBody2 onClick={this.toggleTheme} /> */}
        </ThemeContext.Provider>
        <NestedPanel />
      </div>
    )
  }
}

class NestedPanel extends React.PureComponent {
  render() {
    return (
      <ThemeContext.Consumer>
        {theme => {
          console.log('NestedPanel render')
          return <div style={styles[theme]}>theme</div>
        }}
      </ThemeContext.Consumer>
    )
  }
}

class AppBody extends React.PureComponent {
  render() {
    console.log('AppBody rendered')
    const { onClick } = this.props
    return (
      <ThemeContext.Consumer>
        {theme => {
          console.log('ThemeConsumer render')
          return (
            <div>
              <button style={styles[theme]} onClick={onClick}>
                {theme}
              </button>
              <NestedPanel />
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

render(<App />, document.getElementById('root'))
