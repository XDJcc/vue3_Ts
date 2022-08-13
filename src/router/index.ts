import {
    createRouter,
    createWebHistory,
    NavigationGuardNext,
    RouteLocationNormalized,
} from "vue-router";

import routes from "./routers";
import {recAllRoute} from "@/utils/tools";
import store from "@/store/index";
import {ElMessage} from "element-plus";

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

// 路由白名单（暂时未使用）
const whiteList = ['/404'];
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
        if (!JSON.stringify(routes).includes(to.name as string)) {
            // ElMessage.error("界面不存在");
            next({path: '/404'});
        } else {
            //对白名单路由进行判断  可直接访问
            if (whiteList.indexOf(to.path) !== -1) {
                next();
            } else {
                //判断是否处于登陆状态
                if (!isLogin()) {
                    if (to.path === "/login") {
                        next();
                    } else {
                        next({path: "/login"});
                    }
                } else {
                    //登陆状态 直接跳转进入主界面
                    if (to.path === "/login") {
                        ElMessage.warning({
                            message: "请先退出当前账号",
                            duration: 500,
                        });
                        next({path: "/main"});
                    }
                    //账号权限进行验证
                    if (to.meta.weight > userWeight) {
                        ElMessage.warning("权限不足");
                        next({path: _from.path});
                    } else {
                        // ``;
                        next();
                    }
                }
            }

            // if (to.path !== "/login") {
            //   if (whiteList.indexOf(to.path) !== -1) {
            //     next();
            //   } else {
            //     if (!isLogin()) {
            //       next({ path: "/login" });
            //     } else {
            //       if (to.meta.weight > userWeight) {
            //         ElMessage.warning("权限不足");
            //         next({ path: _from.path });
            //       } else {
            //         next();
            //       }
            //     }
            //   }
            // } else {
            //   next();
            // }
        }
    }
);

export default router;
