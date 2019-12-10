// string ref（不推荐，可能会废弃）
class MyComponent extends React.Component {
  componentDidMount() {
    this.refs.myRef.focus()
  }
  render() {
    return <input ref="myRef" />
  }
}

// callback ref（React 16.3 版本以前，就使用回调版本）
// 建议把ref里面的函数写在render函数外面，refHandle = el => {this.myRef = el}，并且ref={this.refHandle}，
// 如果写在render函数里面，每次render运行都会重新创建这个函数，而每次创建的函数都不是同一个，所以会重新调用，
// 每次都会调用两次，第一次旧函数传入一个null，作用应该是对之前传进去的el的解绑，第二次传入参数DOM元素，调用新函数。
// 而若写在render函数外面，由于refHandle函数每次都是同一个，因此refHandle函数不会被重新创建，也只会调用一次。

// 文档中：
// React 将在组件挂载时，会调用 ref 回调函数并传入 DOM 元素，当卸载时调用它并传入 null。
// 在 componentDidMount 或 componentDidUpdate 触发前，React 会保证 refs 一定是最新的。

// 如果 ref 回调函数是以内联函数的方式定义的，在更新过程中它会被执行两次，第一次传入参数 null，然后第二次会传入参数 DOM 元素。
// 这是因为在每次渲染时会创建一个新的函数实例，所以 React 清空旧的 ref 并且设置新的。
// 通过将 ref 的回调函数定义成 class 的绑定函数的方式可以避免上述问题，但是大多数情况下它是无关紧要的。

class MyComponent extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.myRef = null
  // }
  componentDidMount() {
    this.myRef.focus()
  }
  render() {
    return (
      <input
        ref={el => {
          this.myRef = el
        }}
      />
    )
  }
}

// React.createRef（推荐使用）
class MyComponent extends React.Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
  }
  componentDidMount() {
    this.myRef.current.focus()
  }
  render() {
    return <input ref={this.myRef} />
  }
}

// 你不能在函数组件上使用ref属性，因为他们没有实例。而class组件上是可以使用的。
// 函数组件和class组件内部都是可以使用ref属性的。
