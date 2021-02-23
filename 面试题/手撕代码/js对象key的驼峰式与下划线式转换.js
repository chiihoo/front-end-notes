let obj1 = {
  red_apple: 111,
  green_apple: {
    orange_apple: 222,
    yellow_apple: 333
  },
  many_colorful_apples: [
    {
      green_apple: {
        orange_apple: 555
      }
    }
  ]
}

// 下划线转驼峰式
function underline2hump(obj) {
  if (obj instanceof Array) {
    obj.forEach(item => underline2hump(item))
  } else if (obj instanceof Object) {
    // [] instanceof既是Array类型又是Object类型，所以instanceof要先判断Array
    // 遍历对象，for key in obj也行
    Object.keys(obj).forEach(key => {
      // \w表示任意字母数字下划线
      // replace第二个参数可以是字符串'$1s',其中$1代表第一个()选中的部分
      // 也可以是函数，函数参数第一个是匹配到的整体，后面的参数依次为()匹配的部分
      let newKey = key.replace(/_(\w)/g, ($0, $1) => $1.toUpperCase())
      // 这里如果匹配到了_a，则$0为_a，$1为其中的a
      if (newKey !== key) {
        obj[newKey] = obj[key]
        delete obj[key]
      }
      underline2hump(obj[newKey])
    })
  }
}
underline2hump(obj1)
console.log(obj1)

// ————————————————————————————————————————

let obj2 = {
  redApple: 111,
  greenApple: {
    orangeApple: 222,
    yellowApple: 333
  },
  manyColorfulApples: [
    {
      greenApple: {
        orangeApple: 555
      }
    }
  ]
}
// 驼峰式转下划线
function hump2underline(obj) {
  if (Object.prototype.toString.call(obj) === '[object Array]') {
    obj.forEach(item => hump2underline(item))
  } else if (Object.prototype.toString.call(obj) === '[object Object]') {
    Object.keys(obj).forEach(key => {
      let newKey = key.replace(/[A-Z]/g, $0 => '_' + $0.toLowerCase())
      // 这里如果匹配到了A，则$0为A
      if (newKey !== key) {
        obj[newKey] = obj[key]
        delete obj[key]
      }
      hump2underline(obj[newKey])
    })
  }
}
hump2underline(obj2)
console.log(obj2)
