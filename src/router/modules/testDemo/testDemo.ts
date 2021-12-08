/*
 * test demo 路由
 * */

import { RouteRecordRaw } from "vue-router";

const testRouter: Array<RouteRecordRaw> = [
  {
    path: "/test",
    name: "test",
    component: () => import("@/views/test/Test.vue"),
    meta: {
      weight: -9,
    },
  },
  {
    path: "/test/transition",
    name: "Transition",
    component: () => import("@/views/test/excessive/transition.vue"),
    meta: {
      weight: 4,
    },
  },
];
export default testRouter;
