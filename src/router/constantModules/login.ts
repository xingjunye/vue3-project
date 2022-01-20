import { RouteRecordRaw } from 'vue-router'

const loginRouter: Array<RouteRecordRaw> = [
  {
      path: '/login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "login" */'@/views/login/Index.vue')
  }
]

export default loginRouter