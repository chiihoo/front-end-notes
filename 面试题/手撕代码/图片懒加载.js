//  <img src="default.png占位图片" data-src="真实图片地址" alt="" />
let images = document.querySelectorAll('img')

// dom.getBoundingClientRect().top为元素到视口顶部的距离
// 如果元素在视口之外，并且是在视口底部，则dom.getBoundingClientRect().top > window.innerHeight，
// 当元素第一次出现在视口中时，dom.getBoundingClientRect().top < window.innerHeight
// window.innerHeight或者document.documentElement.clientHeight都行
const lazyload = () => {
  let count = 0
  for (let i = count; i < images.length; i++) {
    if (
      images[i].src === 'default.png' &&
      images[i].getBoundingClientRect().top < window.innerHeight
    ) {
      images[i].src = images[i].getAttribute('data-src')
      count++
    }
  }
}
// 监听滚动事件，并且做节流
window.addEventListener('scroll', throttle(lazyload, 1000))

function throttle(func, duration) {
  let prev = 0
  return function (...args) {
    let now = new Date()
    if (now - prev > duration) {
      func.apply(this, args)
      prev = now
    }
  }
}

function throttle2(func, duration) {
  let timerId = null
  return function (...args) {
    if (!timerId) {
      timerId = setTimeout(() => {
        func.apply(this, args)
        timerId = null
      }, duration)
    }
  }
}

// document.body.scrollTop一直是0的原因
// 指定了DOCTYPE时，使用document.documentElement.scrollTop
// 没指定DOCTYPE时，使用document.body.scrollTop
// let scrollTop = document.documentElement.scrollTop || document.body.scrollTop

// https://img-blog.csdnimg.cn/20190524164645631.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3cxNDE4ODk5NTMy,size_16,color_FFFFFF,t_70

let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
// 也等于window.pageYOffset

let innerHeight = window.innerHeight
// 也等于document.documentElement.clientHeight

// 但是不能用elem.offsetTop来获取到文档顶部的距离，因为offsetTop是针对最近定位父级元素计算的，
// 要计算元素到文档顶部的距离，要么递归用offsetTop获取，要么 elem.getBoundingClientRect().top + scrollTop
// https://www.jianshu.com/p/a53c44393aae

// 方法二 使用IntersectionObserver
const observer = new IntersectionObserver(changes => {
  // changes为被观察的元素合集
  changes.forEach(change => {
    // 通过change.isIntersection来判断是否在视口
    if (change.isIntersection) {
      change.target.src = change.target.getAttribute('data-src')
      observer.unobserve(change.target)
    }
  })
})
images.forEach(img => observer.observe(img))
