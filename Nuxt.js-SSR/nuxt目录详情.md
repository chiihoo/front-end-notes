* pages - 页面目录  页面组件
用于组织应用的路由及视图。Nuxt.js 框架读取该目录下所有的.vue 文件并自动生成对应的路由配置。

* layouts- 布局目录  模板组件

用于组织应用的布局组件，存放的也是.vue文件，其中default.vue的作用是给所有未指定模板的页面默认添加该模板，比如给每个页面都加个顶部的导航条。
<nuxt/> 对应 <router-view/>
<nuxt-link/> 对应 <router-link/>
pages里面的组件默认都是往layouts里面的default.vue中的</nuxt>中扔，
pages里面的组件可以在script中声明layout:'XXX'，就可以更换模板组件

* components - 组件目录   普通的模板
Nuxt.js 不会扩展增强该目录下Vue.js 组件

