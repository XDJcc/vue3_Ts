/*
 * score路由
 * */

import { RouteRecordRaw } from "vue-router";

const scoreRouter: Array<RouteRecordRaw> = [
  {
    path: "/score",
    name: "Score",
    component: () => import("@/views/score/score.vue"),
  },
];
export default scoreRouter;
