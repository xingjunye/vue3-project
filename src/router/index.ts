import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import loginRouter from './constantModules/login'

const routeList: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */'@/views/login/Index.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/home/Index.vue')
  },
  {
    path: '/401',
    component: () => import(/* webpackChunkName: "401" */ '../views/error-page/401.vue'),
    name: 'Page401',
    meta: {
      title: 'page401',
      noCache: true
    }
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "404" */ '../views/error-page/404.vue'),
    name: 'Page404',
    meta: {
      title: 'page404',
      noCache: true
    }
  }
  // ...loginRouter
]

const routes = routeList.concat([
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    meta: { hidden: true }
  }
])

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
