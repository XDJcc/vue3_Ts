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
      weight: 5,
    },
  },
  {
    path: "/runBall",
    name: "RunBall",
    component: () => import("@/views/ball/ball.vue"),
    meta: {
      weight: 5,
      keepAlive: false,
    },
  },
];
export default scoreRouter;
