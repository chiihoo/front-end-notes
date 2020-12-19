**touch 事件**

touchstart：触摸绑定的元素
touchmove：在触摸之后手指进行滑动，就算滑出元素范围都没事
touchend：松开手指的触摸

绑定到要触摸的那个 dom 元素

```
domRef.current.addEventListener('touchstart', (e) => {
  console.log(e.touches[0].clientX)
})
```

要获取到触摸位置的横坐标，就是用的 **e.touches[0].clientX** ，注意这个值并不是 dom 元素距离视口左端的距离，而是在 dom 元素上的触摸位置到视口左端的距离

要注意的是 touchend 事件是没有这个 e.touches[0].clientX !

---

**mouse 事件**

在鼠标事件中，获取鼠标当前的坐标为 **e.clientX**

鼠标移入进去瞬间、鼠标移除瞬间：
mouseover、mouseout：作用于绑定的元素与其子元素
mouseenter、mouseleave：仅作用于绑定的元素

鼠标点击、移动事件：
mousedown 在元素上按下鼠标
mouseup 在元素上释放鼠标
mousemove 在元素上移动鼠标 **易错点**

- 非常需要注意的一点是：
  **这里的 mousemove 跟 touchmove 的用法完全不同：
  touchmove 在绑定的元素上先进行触摸，之后不松手进行滑动，就算滑出了区域都都会触发。
  而 mousemove 只要鼠标在绑定的元素范围内，都会触发，并不是想当然的鼠标点击之后才会触发。**

因此 mouse 事件一般都是绑定在 document 元素上，通过 e.target.matches('选择器') = true，或者 e.target = domRef.current，都可以判断 e.target 是否为目标元素。
鼠标的点击：e.buttons === 0，其中 0、1、2 分别为 左、中、右键，在 mousemove 中松开也可以触发。

```
document.addEventListener('mousedown', e => {
  if (e.target.matches('.square')) {
    document.addEventListener('mousemove', e => {
      if (e.buttons == 0) {
        document.removeEventListener('mousemove', move)
      }
    })
  }
})
```
