import React from 'react'

interface IProps {
  color: string
  size?: string
  sendMsg: any
}

interface IState {
  count: number
}

export default class Hello extends React.Component<IProps, IState> {
  // constructor(props: IProps) {
  //   super(props)
  //   this.state = { count: 0 }
  // }

  // Readonly<T>的源码定义是这样的，Readonly<IState>意思是把IState接口中的每个属性都添加上readonly属性
  // type Readonly<T> = {
  //   readonly [P in keyof T]: T[P];
  // }
  public readonly state: Readonly<IState> = { count: 1 }

  clickHandle = () => {
    this.setState({ count: this.state.count + 1 })
  }
  clickMsgHandle = (count: number) => {
    this.props.sendMsg(count)
  }
  render() {
    const { color, size } = this.props
    const { count } = this.state
    return (
      <div>
        hello! {color} {size} {count}
        <br />
        <button onClick={this.clickHandle}>add</button>
        <button onClick={() => this.clickMsgHandle(count)}>传递事件</button>
      </div>
    )
  }
}
