/*
 * main路由
 * */

import { RouteRecordRaw } from "vue-router";

const homeRouter: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/main",
  },
  {
    path: "/main",
    name: "Main",
    component: () => import("@/views/main/Main.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },
];
export default homeRouter;
