import Vue from 'vue'
import VueRouter from 'vue-router'
// 手动安装VueRouter
Vue.use(VueRouter)

// 导入App组件
import App from './App.vue'
// 从抽离出去的route.js中导入router对象
import router from './router.js'

var vm = new Vue({
  el: '#app',
  render: h => h(App),
  router  //把路由对象挂载到vm上
})