// [1,3,4,5,7,9]    输出： 1点，3-5点，7点，9点
// [1,2,4,6]     输出：周一至周二，周四，周六
// [1,3,15,16,17,20,28,29]      输出：1号，3号，15到17号，20号，28号到29号

// [1, 3, [5, 6, 7], 10]
function chunk(arr) {
  let res = []
  let temp = [arr[0]]
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === arr[i - 1] + 1) {
      temp.push(arr[i])
    } else {
      temp.length > 1 ? res.push([...temp]) : res.push(...temp)
      temp = [arr[i]]
    }
  }
  temp.length > 1 ? res.push([...temp]) : res.push(...temp)
  return res
}

// order为true，1号；为false，号1，周一
let typeInfo = {
  hour: { desc: '点', symbol: '-', order: true },
  week: { desc: '周', symbol: '至', order: false },
  month: { desc: '号', symbol: '到', order: true }
}

let week_days = ['一', '二', '三', '四', '五', '六', '日']
function getText(text, type) {
  if (type === 'week') {
    return week_days[text - 1]
  }
  return text
}

function format(arr, type) {
  let res = []
  for (let item of arr) {
    if (Array.isArray(item)) {
      let x
      if (typeInfo[type].order) {
        x =
          getText(item[0], type) +
          typeInfo[type].desc +
          typeInfo[type].symbol +
          getText(item[item.length - 1], type) +
          typeInfo[type].desc
      } else {
        x =
          typeInfo[type].desc +
          getText(item[0], type) +
          typeInfo[type].symbol +
          typeInfo[type].desc +
          getText(item[item.length - 1], type)
      }
      res.push(x)
    } else {
      let x = typeInfo[type].order
        ? getText(item, type) + typeInfo[type].desc
        : typeInfo[type].desc + getText(item, type)
      res.push(x)
    }
  }
  return res.join(', ')
}

console.log(format(chunk([1, 3, 4, 5, 7, 9]), 'hour'))
console.log(format(chunk([1, 2, 4, 6]), 'week'))
console.log(format(chunk([1, 3, 15, 16, 17, 20, 28, 29]), 'month'))
