// 一个count值初始为0，2个按钮+和-实现count的加减，
// 一个回放按钮，实现回放， 比如一开始执行了 + 然后过了1s 执行了减 ，再过2s执行了加，
// 点击这个按钮可以使这个情景再现

import { useRef, useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)
  const [history, setHistory] = useState([])

  const prevTime = useRef(Date.now())
  const initialCount = useRef(count)

  const add = () => {
    setCount(count => count + 1)
    setHistory([
      ...history,
      {
        time: Date.now() - prevTime.current,
        type: 'add'
      }
    ])
    prevTime.current = Date.now()
  }
  const decrease = () => {
    setCount(count => count - 1)
    setHistory([
      ...history,
      {
        time: Date.now() - prevTime.current,
        type: 'decrease'
      }
    ])
    prevTime.current = Date.now()
  }
  const callbackref = useRef()

  callbackref.current = () => {}
  const back = () => {
    console.log(history)
    setCount(initialCount.current)
    let promise = Promise.resolve()
    history.forEach(item => {
      promise = promise.then(
        res =>
          new Promise(resolve => {
            setTimeout(() => {
              setCount(count => (item.type === 'add' ? count + 1 : count - 1))
              resolve()
            }, item.time)
          })
      )
    })
    promise.then(res => {
      console.log('111')
      setHistory([])
      prevTime.current = Date.now()
      initialCount.current = count
    })
  }

  return (
    <div className="App">
      count:{count}
      <button onClick={add}>+</button>
      <button onClick={decrease}>-</button>
      <button onClick={back}>回放</button>
    </div>
  )
}
