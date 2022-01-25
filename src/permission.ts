import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from '@/router'
import { RouteLocationNormalized } from 'vue-router'
import { cookie } from "@/utils/Application"
import { whiteList } from "@/config/whitelist"

/** 全局路由拦截 */
router.beforeEach(async (to: RouteLocationNormalized, _: RouteLocationNormalized, next: any) => {
  const token = cookie.get("accessToken");
  NProgress.start();
  if(token) {
    if (to.path === "/login") {
      // next({ path: '/' })
      NProgress.done()
      next();
    } else {
      next();
    }
  } else {
    if (whiteList.includes(to.path)) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
    }
  }
});

router.afterEach((to: RouteLocationNormalized) => {
  NProgress.done();
});