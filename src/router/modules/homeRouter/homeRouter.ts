/*
 * main路由
 * */

import {RouteRecordRaw} from "vue-router";

const homeRouter: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: 'index',
        redirect: "/main",
        meta: {
            weight: -9,
        },
    },
    {
        path: "/main",
        name: "Main",
        component: () => import("@/views/main/Main.vue"),
        meta: {
            weight: -9,
        },
    },
    {
        path: "/404",
        name: "404",
        component: () => import("@/views/404.vue"),
        meta: {
            weight: -9,
        },
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("@/views/Login.vue"),
        meta: {
            weight: -9,
        },
    },
];
export default homeRouter;
