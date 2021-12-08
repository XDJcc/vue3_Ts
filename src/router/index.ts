import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
} from "vue-router";

import routes from "./routers";
import { recAllRoute } from "@/utils/tools";
import store from "@/store/index";
import { ElMessage } from "element-plus";

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
    const userWeight = store.getters.nowUserWeight;
    //路由自动回退
    if (!JSON.stringify(routes).includes(to.name as string) ) {
      ElMessage.error("界面不存在");
      next({ path: _from.path });
    } else {
      if (to.path !== "/login") {
        if (whiteList.indexOf(to.path) !== -1) {
          next();
        } else {
          if (!isLogin()) {
            next({ path: "/login" });
          } else {
            if (to.meta.weight >= userWeight) {
              ElMessage.warning('权限不足')
              next({ path: _from.path });
            } else {
              next();
            }
          }
        }
      } else {
        next();
      }
    }
  }
);

export default router;
