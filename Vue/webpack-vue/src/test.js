var info = {
  name: 'zs',
  age: 20
}
export default info

// 同一个模块中，export default只允许向外暴露一次
// export default{
//   name:'ls',
//   age:19
// }


// export 这种方式可以向外暴露多次，与export default这种形式不冲突
// 使用export向外暴露的变量要用{ }的形式来接收，这种形式叫做【按需导出】
export var title = '数星星'
export var content = {
  question: '天上星星一颗两颗三颗四颗连成线',
  answer: '是4颗哦'
}

