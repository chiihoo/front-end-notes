**用Canvas将图片转Base64**

```js
function toBase64 (url) {
    let canvas = document.createElement('canvas')
    let ctx = canvas.getContext('2d')

    let image = new Image()
    image.setAttribute('crossOrigin', 'anonymous')
	image.src = url

    return new Promise((resolve) => {
        image.onload = function() {
            canvas.width = this.width
            canvas.height = this.height
            canvas.drawImage(this, 0, 0)
            let base64 = canvas.toDataUrl('image/jpeg', 0.5) // toDataUrl可以接收2个参数，参数一：图片类型，参数二： 图片质量0-1（不传默认为0.92）
            resolve(base64)
        }
    })
}
```


![](https://images2017.cnblogs.com/blog/1253382/201712/1253382-20171206104419144-1143460766.png)



