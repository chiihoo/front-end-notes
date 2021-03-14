控制旋转动画暂停

```
animation-play-state: paused 或 running;

@keyframes rotateClockwise {
    0% {
    	transform: rotate(0deg);
    }
    100% {
    	transform: rotate(360deg);
    }
}
.rotate {
	animation: rotateClockwise 25s linear infinite;
}
```



https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial

```
<canvas ref={canvasRef} width={width} height={height}></canvas>
```

```js
const ctx = canvasRef.current.getContext('2d')

// 清空画布
ctx.clearRect(0, 0, width, height)

// 保存当前状态的一份拷贝
ctx.save()
// 将原点移动到正中心
ctx.translate(width / 2, height / 2)

// ctx.rotate(-Math.PI / 2)

/*
首先频率数据是0~255
获取小于canvas画布宽高的一段距离len
由于频率数据是数组形式，首尾差别太大，没法平滑连接
所以分别乘以不同的小于1的数，将其差距拉小点
每一圈画50个数据，每个数据的角度为const angle = (Math.PI * 2) / 50
之后要画的点就是
x: len * Math.cos(angel * i)
y: len * Math.sin(angel * i)
都放到pos[]数组里面
*/
// 开始循环画
for (let j = 0; j <= 50; j++){
    ctx.beginPath()
    ctx.fillStyle = 'rgba(255, 230, 0, 0.3)'
    ctx.move(pos[j].x, pos[j].y)
    // 平滑连接的方法是笨法子，
    // 用两个位置坐标之间的平均数，用二次贝塞尔曲线连接
    // 控制点为第一个点，结束点为平均数点
    for (let i = j + 1; i < j + 48; i++) {
        let x_mid = (pos[i].x + pos[i + 1].x) / 2
        let y_mid = (pos[i].y + pos[i + 1].y) / 2
        ctx.quadraticCurveTo(pos[i].x, pos[i].y, x_mid, y_mid)
    }
    let x_mid = (pos[j + 49].x + pos[j].x) / 2
    let y_mid = (pos[j + 49].y + pos[j].y) / 2
    ctx.quadraticCurveTo(pos[j + 49].x, pos[j + 49].y, x_mid, y_mid)

    x_mid = (pos[j].x + pos[j + 1].x) / 2
    y_mid = (pos[j].y + pos[j + 1].y) / 2
    ctx.quadraticCurveTo(pos[j].x, pos[j].y, x_mid, y_mid)
    //结束绘制
    ctx.closePath()
    // 填充
    ctx.fill()
}

// 画完这一帧，复原
ctx.restore()



// 之后以上代码都放在requsetAnimationFrame的step里面
// 一帧一帧的画

```

```js
路径
beginPath()
moveTo(x, y)
closePath()
fill()填充
stroke()描边

矩形
fillRect(x, y, width, height) 实心矩形
stokeRect(x, y, width, height) 空心描边矩形
clearRect(x, y, width, height)

圆弧
arc(x, y, r, startAngle, endAngle, anticlosewise) // 以(x,y)为圆心 r为半径的圆  绘制startAngle弧度 到endAngle弧度的圆弧 anticlosewise默认为false 即顺时针方向 true为逆时针方向

arcTo(x1, y1, x2, y2, radius) //根据 两个控制点 (x1,y1) 和 (x2, y2)以及半径绘制弧线 同时连接两个控制点


贝塞尔曲线
quadraticCurveTo(cp1x, cp1y, x, y)   // 二次贝塞尔曲线 (cp1x,cp1y) 控制点 (x,y)结束点   
bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)  // 三次贝塞尔曲线 (cp1x,cp1y)控制点1 (cp2x,cp2y) 控制点2 (x,y)结束点

样式添加
fillStyle = '#fff' // 也可以添加渐变对象context.createLinearGradient(30, 30, 800, 800)
stokeStyle = 'rgba(50, 20, 70, 0.5)'
lineWidth = 10
lineCap = 'butt'|'round'|'square' // 线条末端样式  方形、圆形&突出、方形&突出
lineJoin = 'round'|'bevel'|'miter' // 线条交汇处样式 依次是圆形、平角 、 三角形
ctx.setLineDash([ 实际长度 , 间隙长度 ]) //虚线 setLineDash接受数组
ctx.lineDashOffet  //设置偏移量

渐变
let gradient = ctx.createLinearGradient( x1 ,y1 ,x2 ,y2); //线性渐变
let gradient = ctx.createRadialGradient(x1 ,y1 ,r1 ,x2 ,y2 ,r2);//径向渐变
gradient.addColorStop( position , color )// position:相对位置0~1    color:该位置下的颜色

透明度
ctx.globalAlpha = 0到1

文本
fillText( text , x , y , [,maxWidth]) 在(x,y)位置绘制text文本  最大宽度为maxWidth(可选)
strokeText( text ,x ,y ,[,maxWidth]) 在(x,y)位置绘制text文本边框  最大宽度为maxWidth(可选)
font = '100px sans-serif'

绘制图片
drawImage(image, x, y, width, height)  // image为图片对象、从(x,y)处放置宽高分别为width height的图片
drawImage(image, sx, sy, swidth, sheight, dx, dy, dwidth, dheight) // 切片前四个是定义图像源的切片位置和大小，后四个是定期切片的目标显示位置大小

状态保存、恢复
ctx.save()
ctx.restore()

动作
translate(x, y) // 将canvas原点的移动到 (x,y), 记得之前先保存状态ctx.save()
rotate(angle) // 顺时针旋转坐标轴，如果angle为负的，则逆时针旋转
scale(x, y) // 缩放

裁剪
clip() //设定裁选区之后，无论在Canvas上绘制什么，只有落在裁选区内的那部分才能得以显示，其余都会被遮蔽掉

动画
ctx.clearRect(x, y, width, height) // 可用于清空画布
ctx.save() // 保存状态
ctx.restore() // 恢复状态
```



**获取音频数据**

1. 通过HTML5的`AudioContext`接口创建`Audio`上下文`ctx`
2. 通过`createAnalyser`创建`AnalyserNode`
3. 通过`createMediaElementSource(audio标签)`创建`SourceNode`
4. 之后`SourceNode`连接`AnalyserNode`，`AnalyserNode`连接`ctx.destination`
5. 之后就可以通过`AnalyserNode`的`frequencyBinCount`属性获取到频率数组了

**`createMediaElementSource` bug可以用`createBufferSource`降级**

```js
// 只初始化一次
if (this.ctx) return
// 创建Audio上下文
this.ctx = new (window.AudioContext || window.webkitAudioContext)()

// 音频可视化相关操作
// 初始化AudioContext，并做connect操作
@action
initAudioContext() {
    // createMediaElementSource方法在ios上有bug
    // https://www.zhihu.com/question/277535711/answer/394718335
    // https://stackoverflow.com/questions/58306894/has-ios13-broken-audio-tags-used-as-audio-buffers-connected-to-the-audio-conte
    if (isIOS()) return

    // 只初始化一次
    if (this.ctx) return
    // 创建Audio上下文
    this.ctx = new (window.AudioContext || window.webkitAudioContext)()

    // 创建AnalyserNode，用于获取音频的频率数据（FrequencyData）和时域数据（TimeDomainData）。从而实现音频的可视化。
    this.analyser = this.ctx.createAnalyser()
    //快速傅里叶变换的一个参数，2的幂次方，数字越大，得到的结果越精细。fftSize决定了frequencyData的长度，具体为fftSize的一半
    this.analyser.fftSize = 512

    // 设置SourceNode
    // createMediaElementSource可以用createBufferSource来降级，但是实在是麻烦
    this.source = this.ctx.createMediaElementSource(this.audio.current)

    // 连接操作
    this.source.connect(this.analyser)
    this.analyser.connect(this.ctx.destination)

    // 获取频率数组
    // frequencyBinCount为fftSize值的一半. 该属性通常用于可视化的数据值的数量.
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount)
    // getByteFrequencyData 更新操作，是对已有的数组元素进行赋值，而不是创建后返回新的数组
    this.analyser.getByteFrequencyData(this.dataArray)
}

// 更新DataArray
@action
updateDataArray() {
    if (this.analyser) {
    	this.analyser.getByteFrequencyData(this.dataArray)
    }
}

```

