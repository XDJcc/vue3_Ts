/*
 * score路由
 * */

import { RouteRecordRaw } from "vue-router";

const scoreRouter: Array<RouteRecordRaw> = [
  {
    path: "/score",
    name: "Score",
    component: () => import("@/views/score/score.vue"),
    meta: {
      weight: 2,
    },
  },
];
export default scoreRouter;
