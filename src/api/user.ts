import http from "@/utils/http/index";
import {IUser} from "../utils/http/types";
import store from "@/store";
import {removeToken} from "@/utils/localStorage/setLocalSotrage";

export default class UserApi {
    /*
     * 获取用户信息
     * */
    static async getUser(params: IUser) {
        return await http.reqPost(`/user/info`, params);
    }

    /*
     * login 登陆获取token存储到本地缓存
     * */
    static async mockLogin(data) {
        return await http.reqPost(`/system-api/login`, data);
    }

    /*
     * loginout  退出登陆
     * */

    static async mockLoginOut() {
        return await http.reqPost(`/system-api/logout`);
    }

    /*
   * 后去验证码图片 获取uid 进行登陆
   * */
    static async mockImgUid() {
        return await http.reqGet(`/system-api/captchaImage`);
    }

};
