/*
 * main路由
 * */

const homeRouter = [
  {
    path: "/",
    name: "Home",
    // eslint-disable-next-line
    component: () => import("@/views/Home.vue"),
  },
];
export default homeRouter;
