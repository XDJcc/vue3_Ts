import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
} from "vue-router";

import routes from "./routers";
import { recAllRoute } from "@/utils/tools";
import store from "@/store/index";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// 路由白名单（暂时未使用）
const whiteList = ["/login"];
const routeList = recAllRoute(routes);

const isLogin = () => {
  if (store.state.isLogin) return true;
  else {
    return JSON.parse(localStorage.getItem("isLogin")) ? true : false;
  }
};


//路由守卫
router.beforeResolve(
  (
    to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    //路由自动回退
    // if (!JSON.stringify(routes).includes(to.path)) {
    //   next({path:_from.path});
    // }

    if (to.path !== "/login") {
      if (whiteList.indexOf(to.path) !== -1) {
        next();
      } else {
        if (!isLogin()) {
          next({ path: "/login" });
        } else {
          next();
        }
      }
    } else {
      next();
    }
  }
);

export default router;
