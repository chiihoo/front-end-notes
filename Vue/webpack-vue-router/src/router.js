import VueRouter from 'vue-router'

// 导入在App中的Account和GoodsList组件
import account from './main/Account.vue'
import goodslist from './main/GoodsList.vue'

// 导入Account组件的两个子组件login和register
import login from './subcom/login.vue'
import register from './subcom/register.vue'

var router = new VueRouter({
  routes: [
    {
      path: '/account',
      component: account,
      children: [
        {path:'login',component:login},
        {path:'register',component:register}
      ]
    },
    { path: '/goodslist', component: goodslist },
    { path: '/', redirect: '/account' }
  ]
})

export default router