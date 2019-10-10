import Vue from 'vue'
import App from './App.vue'

// 只能引用一个store，上面的是一个store，下面的是由多个store组合而成
// import store from './store.js'
import store from './store/index'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
