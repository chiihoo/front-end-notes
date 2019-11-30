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
// 建议把ref里面的函数写在render函数外面，refHandle = (el) => {this.myRef = el;}，并且ref={this.refHandle}，
// 如果写在render函数里面，每次render运行都会重新创建这个函数，而每次创建的函数都不是同一个，所以会重新调用，
// 每次都会调用两次，第一次旧函数传入一个null，作用应该是解绑，第二次调用新函数
// 而若写在render函数外面，由于refHandle函数每次都是同一个，因此refHandle函数不会被重新创建，也只会调用一次
class MyComponent extends React.Component {
  componentDidMount() {
    this.myRef.focus()
  }
  render() {
    return <input ref={(el) => {
      this.myRef = el
    }} />
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
