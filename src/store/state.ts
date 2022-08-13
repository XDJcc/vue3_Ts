/*
 *  master_state
 * */


import {getToken} from "@/utils/localStorage/setLocalSotrage";

export interface IsState {
    name: string;
    isLogin: boolean;
    token: string,
}

const state: IsState = {
    name: "李四",
    isLogin: false,
    token: getToken() ?? "",
};

export default state;
