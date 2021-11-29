import { RouteRecordRaw } from "vue-router";

//主页的路由
import homeRouter from "./modules/homeRouter/homeRouter";

//第一个模块的路由
import firstModule from "./modules/firstModule/firstModule";

//test demo
import testModule from "./modules/testDemo/testDemo";

//score demo
import scoreRouter from "./modules/score/score";

//score demo
import cloudRouter from "./modules/cloudMusic/cloudMusic";

const routes: Array<RouteRecordRaw> = [
  ...firstModule,
  ...homeRouter,
  ...testModule,
  ...scoreRouter,
  ...cloudRouter,
];

export default routes;
