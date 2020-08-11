在render函数执行的时候，新旧两个虚拟DOM会进行对比，如果两个元素有不同的key，那么在前后两次渲染中就会被认为是不同的元素，这时候旧的那个元素会被unmount，新的元素会被mount

如果两个元素是相同的key，且满足第一点元素类型相同， 若元素属性有所变化，则React只更新组件对应的属性，这种情况下，性能开销会相对较小

用key的真实目的是为了标识在前后两次渲染中元素的对应关系，防止发生不必要的更新操作。

像我在网易云音乐项目里面，播放页面旋转的图片，如果不加key，每次只会替换img属性，但这样旋转的角度不会重置，所以需要加key，每次都重新生成这个dom元素。



如果在map中没有使用key，比如ul中很多li，如果要在其中插入一个li，那diff算法会怎么处理呢？由于li标签名字是没有改变的，diff就只会改变属性，从插入的那个li开始，一直到最后一个，每个都会改变，非常的浪费性能。其实根本就没有必要每个都改变属性，因为只是添加了一个li，其余的li都只是更换了位置而已，怎么样让react识别到这个呢？给li设置一个独特的key即可，那样react就会知道li只是更换了位置。

![](https://upload-images.jianshu.io/upload_images/13201627-c3e12cdb02d59c24.png?imageMogr2/auto-orient/strip|imageView2/2/w/477/format/webp)

![](https://upload-images.jianshu.io/upload_images/13201627-9d6226c6268a341b.png?imageMogr2/auto-orient/strip|imageView2/2/w/572/format/webp)

![](https://upload-images.jianshu.io/upload_images/13201627-d0b3a1577860fda9.png?imageMogr2/auto-orient/strip|imageView2/2/w/452/format/webp)