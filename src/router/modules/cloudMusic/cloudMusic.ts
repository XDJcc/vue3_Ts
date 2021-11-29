/*
 * main路由
 * */

import { RouteRecordRaw } from "vue-router";

const cloudRouter: Array<RouteRecordRaw> = [
  {
    path: "/cloud",
    name: "Cloud",
    component: () => import("@/views/cloud/Cloud.vue"),
  },
];
export default cloudRouter;
