import { RouteRecordRaw } from "vue-router";
//主页的路由
import homeRouter from "./modules/homeRouter/homeRouter";

//第一个模块的路由
import firstModule from "./modules/firstModule/firstModule";

const routes: Array<RouteRecordRaw> = [...firstModule, ...homeRouter];

export default routes;
