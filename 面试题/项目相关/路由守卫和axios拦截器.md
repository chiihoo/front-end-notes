```
declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth: boolean
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: () => import('../views/login/login.vue')
  },
  {
    path: '/',
    component: () => import('../views/main/main.vue'),
    redirect:'/articles',
    meta: { requiresAuth: true },
    children: [
      {
        path: '/categories',
        component: () => import('../views/categories/categories.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/categories/create',
        component: () => import('../views/categories/categories-create.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/categories/create/:id',
        component: () => import('../views/categories/categories-create.vue'),
        meta: { requiresAuth: true },
        props: true
      },
      {
        path: '/categories/edit/:id',
        component: () => import('../views/categories/categories-edit.vue'),
        meta: { requiresAuth: true },
        props: true
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem('access_token')) {
    next('/login')
  }
  next()
})
```





routes配置里面可以设置meta元数据，设定一个`requiresAuth: true`的元数据，之后在**router.beforeEach**钩子函数中，参数为to,from,next，当如果要跳转的路由的meta有这个属性，则继续跳转



**router.berforeEach((to, from, next) => {**

​		if (**to.meta.requiresAuth** && !localStorage.getItem('access_token')) {

​				**next('/login')**  

​		}

​		**next()**

**})**

**一定要调用next()**









```
const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3005'
      : 'http://121.196.155.101:5000/api'
})

axiosInstance.interceptors.request.use(
  config => {
    if (localStorage.access_token) {
      config.headers.Authorization = 'Bearer ' + localStorage.getItem('access_token')
    }
    return config
  },
  err => {
    console.log('error', err)
    return Promise.reject(err)
  }
)

axiosInstance.interceptors.response.use(
  res => {
    return res.data
  },
  err => {
    // 'Unauthorized'登录失效或者未登录
    if (err.response?.status === 401) {
      router.push('/login')
    }
    err.response?.data?.error &&
      ElMessage({
        type: 'error',
        center: true,
        showClose: true,
        duration: 1000,
        message: err.response.data.error
      })
    return Promise.reject(err)
  }
)

export default axiosInstance
```



jwt鉴权是把token放localStorage中，每次登陆都在axio request拦截器中设置**config.header.Authorization**

`axios.interceptors.request.use(config => config.headers.Authorization = 'Bearer ' + localstorage.get(access_token))`

而在response拦截器中，每次状态码为**401未授权**时，跳转路由到登陆页面。（状态码不为200就会跳到err处理中）

`axios.interceptors.response.use(res => res.data, err => {if (err.response.status === 401) {route.push('/login')}})`

