//递归获取所有的路由 name
import { RouteRecordRaw } from "vue-router";

export const recAllRoute = function (
  list: Array<RouteRecordRaw>
): Array<string> {
  let routeList: Array<string> = [];
  for (let i = 0; i < list.length; i++) {
    const item: RouteRecordRaw = list[i];
    routeList.push(item.name as string);
    if (item.children) {
      routeList = routeList.concat(recAllRoute(item.children));
    }
  }
  return routeList;
};
