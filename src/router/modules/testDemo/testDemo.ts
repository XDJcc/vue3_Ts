/*
 * test demo 路由
 * */

import { RouteRecordRaw } from "vue-router";

const testRouter: Array<RouteRecordRaw> = [
  {
    path: "/test",
    name: "test",
    component: () => import("@/views/test/Test.vue"),
  },
];
export default testRouter;
