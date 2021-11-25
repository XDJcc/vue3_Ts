/*
 * 第一次项目文件
 * */
import { RouteRecordRaw } from "vue-router";

const remainRouter: Array<RouteRecordRaw> = [
  {
    path: "/first",
    redirect: "/first/myName",
    name: "first",
    component: () => import("@/views/About.vue"),
    children: [
      {
        path: "myName",
        name: "MyName",
        component: () => import("@/components/MyName.vue"),
        redirect: "/first/myName/thirdRoute1",
        children: [
          {
            path: "thirdRoute1",
            name: "ThirdRoute1",
            component: () => import("@/components/MyAge.vue"),
          },
          {
            path: "thirdRoute2",
            name: "ThirdRoute2",
            component: () => import("@/components/MyWeight.vue"),
          },
        ],
      },
      {
        path: "myAge",
        name: "myAge",
        component: () => import("@/components/MyAge.vue"),
      },
    ],
  },
];

export default remainRouter;
