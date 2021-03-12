* `transition`
* `transform: translate(10px, 20px) / scale(2) / rotate(45deg) / skew(15deg)` 与 `transition` 结合
* `@keyframes foo {}` 与 `animation: foo 1s liner`
* `requestAnimationFrame`



https://developer.mozilla.org/zh-CN/docs/Web/CSS/angle

```
deg：度            一个完整的圆360deg
grad：百分度       一个完整的圆是400grad
rad：弧度          一个完整的圆是2π弧度
turn：圈数         一个完整的圆是1turn
```



https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation

```css
@keyframes tranAni {
	// from {}也行
	0% {
		transform: translateX(0)
	}
	50%, 70% {
		transform: translateX(30px)
	}
	// to {}也行
	100% {
		transform: translateX(50px)
	}
	
}


.bar:hover {
	animation: tranAni 5s ease-in 1s
}
```

```
/* @keyframes duration | timing-function | delay |
   iteration-count | direction | fill-mode | play-state | name */
```





