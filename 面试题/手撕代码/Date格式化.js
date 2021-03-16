function dateFormat(str) {
  const date = new Date()
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let q
  switch (Math.ceil(month / 3)) {
    case 1:
      q = '第一季度'
      break
    case 2:
      q = '第二季度'
      break
    case 3:
      q = '第三季度'
      break
    case 4:
      q = '第四季度'
      break
    default:
      break
  }
  return str.replace(/YYYY([-|\/])MM([-|\/])DD( QQ)?/, (_, $1, $2, $3) => {
    return '' + year + $1 + month + $2 + day + ($3 ? ' ' + q : '')
  })
}

dateFormat('YYYY-MM-DD')
dateFormat('YYYY/MM/DD')
dateFormat('YYYY/MM/DD QQ') // QQ表示季度
