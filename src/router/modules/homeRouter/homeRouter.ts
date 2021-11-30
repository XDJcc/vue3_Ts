/*
 * main路由
 * */

import { RouteRecordRaw } from "vue-router";

const homeRouter: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/first",
    // name: "Home",
    // eslint-disable-next-line
    // component: () => import("@/views/Home.vue"),
  },
  {
    path: "/main",
    name: "Main",
    component: () => import("@/views/main/Main.vue"),
  },
];
export default homeRouter;
