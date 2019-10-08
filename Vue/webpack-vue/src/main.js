// 先安装vue， cnpm i vue -S 
// 在webpack中，使用import Vue from 'vue'导入的Vue构造函数，功能不完整，只提供了runtime-only方式
// 方法一:
// import Vue from '../node_modules/vue/dist/vue.js'
// 方法二:
import Vue from 'vue'
// 在webpack.config.js中配置
// resolve:{
//   alias:{
//     'vue$':'vue/dist/vue.esm.js'
//   }
// }


import login from './login.vue'
// 默认 webpack无法打包 .vue文件，需要安装相关的loader:
// cnpm i vue-loader vue-template-compiler -D
// 针对15版本的vue-loader
// 在webpack配置文件中，新增loader配置项{test:/\.vue$/,use:'vue-loader'}
// const VueLoaderPlugin = require('vue-loader/lib/plugin') 
// 并在plugins中新增 new VueLoaderPlugin()


var vm = new Vue({
  el: '#app',
  data: {
    //这个msg根本没显示，直接被login组件把#app这个div整体替换掉了
    msg: '123'
  },
  // components:{
  //   login
  // }


  // 在webpack中，如果想通过vue把一个组件放到页面中去展示，只能用 vm实例中的render函数 去实现
  // render: function (createElements) {
  //   return createElements(login)
  // }

  // render函数会直接把#app这个div替换成login模板
  // 简写
  render: c => c(login)

})


// ed是接收export default向外暴露的成员，ed这个名字可以随便换

// 而{title,content}是接收export var title和export var content向外暴露的成员，
// 定义的是哪个名字，就只能写这个名字，但是可以用as取别名{ title as t1, content }

// ed和{ }这两个的顺序不能换
import ed, { title as t1, content } from './test.js'
console.log(ed)
// console.log(title)
console.log(t1)
console.log(content)