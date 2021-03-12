// 必须有小数点的，后面是 \.
let reg1 = new RegExp(/(\d)(?=(\d{3})+\.)/, 'g')

'1123223.78'.replace(reg1, '$1,')

// 必须是整数，后面是 $ 末尾符号
let reg2 = new RegExp(/(\d)(?=(\d{3})+$)/, 'g')
'1123223'.replace(reg2, '$1,')
