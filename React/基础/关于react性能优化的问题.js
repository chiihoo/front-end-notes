// 一、class组件
// 1.shouldComponentUpdate
// 返回false时，组件不会render
class Foo extends React.Component {
  state = { count: 1 }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.color !== nextProps.color) {
      return true
    }
    if (this.state.count !== nextState.count) {
      return true
    }
    return false
  }
  render() {
    return <div></div>
  }
}

// 2.PureComponent
// PureComponent 可以来代替手写 shouldComponentUpdate，但它只会进行浅对比
class Foo extends React.PureComponent {}

// 避免这个问题最简单的方式是避免更改你正用于props或state的值
// 要么用扩展运算符生成一个新的数组或对象
// 要么**使用immer不可变数据类型**

// 二、function组件

// 同时使用React.memo()和useCallback()

// 这里如果没有memo和useCallback的话，在任意一个框中输入，都会导致两个组件重新render
// 因为在第一个框输入，改动了val1，触发App组件重新渲染，下层两个组件也会重新render
// 如果仅有useCallback，onChange1和onChange2虽还是原来的函数，但没有作用
// 必须配合React.memo或class组件的shouldComponentUpdate或PureComponent才行
var { useState, useCallback } = React
const Child = React.memo(function({ val, onChange }) {
  console.log('render...', val)
  return <input value={val} onChange={onChange} />
})
function App() {
  const [val1, setVal1] = useState('')
  const [val2, setVal2] = useState('')
  const onChange1 = useCallback(evt => {
    setVal1(evt.target.value)
    console.log(1)
  }, [])
  const onChange2 = useCallback(evt => {
    setVal2(evt.target.value)
    console.log(2)
  }, [])
  return (
    <div>
      <Child val={val1} onChange={onChange1} />
      <br />
      <Child val={val2} onChange={onChange2} />
    </div>
  )
}

// 单独使用useCallback，可能会降低性能
// const onChange = useCallback(evt => {
//   setVal(evt.target.value)
// }, [])
// 等价于
// const temp = evt => {
//   setVal(evt.target.value)
// }
// const onChange = useCallback(temp, [])

// https://segmentfault.com/a/1190000020108840#item-4
