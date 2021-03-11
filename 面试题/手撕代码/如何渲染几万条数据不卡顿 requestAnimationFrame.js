// 我在网上看到的答案外面都加了个setTimeout
// 可能是把这次添加移到下一次浏览器渲染完毕后再执行

setTimeout(() => {
  const total = 100006
  const onceMax = 50 // 每次渲染的最大个数
  let count = 0

  const ul = document.createElement('ul')
  document.body.appendChild(ul)

  function step(time) {
    const fragment = document.createDocumentFragment() // 创建虚拟节点
    for (let i = 0; i < onceMax; i++) {
      const li = document.createElement('li')
      li.innerText = Math.floor(Math.random() * 100000)
      fragment.appendChild(li)
    }
    ul.appendChild(fragment)
    // fragment.remove() 虚拟节点没有remove方法
    count++
    if (count < Math.floor(total / onceMax)) {
      requestAnimationFrame(step)
    }
    // else {
    //   // 如果total=11，onceMax=2，最后一次时count=5，进入这个作用域，还剩一个元素没有加载完
    //   let rest = total - onceMax * count
    //   const fragment = document.createDocumentFragment() // 创建虚拟节点
    //   for (let i = 0; i < rest; i++) {
    //     const li = document.createElement('li')
    //     li.innerText = Math.floor(Math.random() * 100000)
    //     fragment.appendChild(li)
    //   }
    //   ul.appendChild(fragment)
    // }
  }

  if (count < total / onceMax) {
    requestAnimationFrame(step)
  }
}, 0)
