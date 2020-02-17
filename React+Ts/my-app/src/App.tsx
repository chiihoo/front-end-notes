import React, { FC, useState } from 'react'
import Hello from './components/Hello'

interface AppProps {
  style?:string
}
const App: React.FC<AppProps> = props => {
  const [count, setCount] = useState(0)
  const sendMsg = (val: number) => {
    setCount(val)
  }
  return (
    <div>
      父组件的count:{count}
      <Hello color="skyblue" size="big" sendMsg={sendMsg} />
    </div>
  )
}

export default App
