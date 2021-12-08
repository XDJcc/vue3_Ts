//递归获取所有的路由 name
import { RouteRecordRaw } from "vue-router";
import store from "@/store";

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

export function fliterTime(time = 0): string {
  const timer = new Date(parseInt(time / 1000 + ""));

  const year = timer.getFullYear(); //年
  const month = timer.getMonth() + 1; //月
  const day = timer.getDate(); //日

  const hh = timer.getHours(); //时
  const mm = timer.getMinutes(); //分

  let clock = year + "-";
  if (month < 10) clock += "0";
  clock += month + "-";
  if (day < 10) clock += "0";
  clock += day + " ";
  if (hh < 10) clock += "0";
  clock += hh + ":";
  if (mm < 10) clock += "0";
  clock += mm;
  return clock;
}

//获取音乐的播放时长
export function getMusicAllTime(time: number): string {
  //处理时长
  //分钟
  const minute = Math.floor(time / 60);
  const minutes = minute < 10 ? "0" + minute : minute;
  //秒
  const second = Math.round(time % 60);
  const seconds = second < 10 ? "0" + second : second;
  return minutes + ":" + seconds;
}

/*
 * 对账号进行权重验证 更新权重
 * @params userId
 * @params password
 *
 * @return Boolean  是不是管理员账号
 * */
export async function verifyUserIdentity(
  userId: string,
  password: string
): Promise<boolean> {
  let userWeight = 1;
  let isAdmin = false;
  const userList = store.state.person.userList;
  if (JSON.stringify(userList).includes(userId) && password == "123456") {
    isAdmin = true;
    userList.forEach((item) => {
      if (userId === item.userId && password === item.password) {
        userWeight = item.IdWeight;
      }
    });
  }
  await store.dispatch("updateUserInfo", userWeight); //更新登陆账号的权重
  return isAdmin;
}
