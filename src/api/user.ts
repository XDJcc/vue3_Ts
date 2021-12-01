import http from "@/utils/http/index";
import { IUser } from "../utils/http/types";

export default {
  /*
   * 获取用户信息
   * */
  async getUser(params: IUser) {
    return await http.post(`/user/info`, params);
  },
};
