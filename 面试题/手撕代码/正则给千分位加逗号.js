// 必须有小数点的，后面是 \.
let reg1 = new RegExp(/(\d)(?=(\d{3})+\.)/, 'g')

'1123223.78'.replace(reg1, '$1,')

// 必须是整数，后面是 $ 末尾符号
let reg2 = new RegExp(/(\d)(?=(\d{3})+$)/, 'g')
'1123223'.replace(reg2, '$1,')

function transform(str) {
  let arr = str.split('.')
  let s = arr[0]
  let res = []
  let i
  for (i = s.length - 3; i >= 0; i -= 3) {
    res.unshift(s.slice(i, i + 3))
  }

  if (i < 0) {
    res.unshift(s.slice(0, i + 3))
  }

  if (arr[1]) {
    return res.join(',') + '.' + arr[1]
  }
  return res.join(',')
}
console.log(transform('1123456789.567'))
