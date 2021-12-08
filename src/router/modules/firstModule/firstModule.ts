/*
 * 第一次项目文件
 * */
import { RouteRecordRaw } from "vue-router";

const remainRouter: Array<RouteRecordRaw> = [
  {
    path: "/first",
    redirect: "/first/myName",
    name: "first",
    component: () => import("@/views/thirdRouterAndVuex/About.vue"),

    children: [
      {
        path: "myName",
        name: "MyName",
        component: () =>
          import("@/views/thirdRouterAndVuex/components/MyName.vue"),
        redirect: "/first/myName/thirdRoute1",
        children: [
          {
            path: "thirdRoute1",
            name: "ThirdRoute1",
            component: () =>
              import("@/views/thirdRouterAndVuex/components/MyAge.vue"),
            meta: {
              weight: -9,
            },
          },
          {
            path: "thirdRoute2",
            name: "ThirdRoute2",
            component: () =>
              import("@/views/thirdRouterAndVuex/components/MyWeight.vue"),
            meta: {
              weight: -9,
            },
          },
        ],
      },
      {
        path: "myAge",
        name: "myAge",
        component: () =>
          import("@/views/thirdRouterAndVuex/components/MyAge.vue"),
        meta: {
          weight: -9,
        },
      },
    ],
  },
];
export default remainRouter;
