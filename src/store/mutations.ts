/*
 *  master_mutations
 * */
import {LOGIN, REMOVE_TOKEN, SET_TOKEN, UPDATE_NAME} from "./type";
import {removeToken, setToken} from "@/utils/localStorage/setLocalSotrage";
import store from "@/store/index";

const mutations = {
    [UPDATE_NAME](state, {data}: { data: string }): void {
        state.name = data;
    },
    [LOGIN](state, {data}): void {
        state.isLogin = data;
        localStorage.setItem("isLogin", `${data}`);
    },
    [SET_TOKEN](state, token: string): void {
        state.token = token;
        setToken(token);
    },
    [REMOVE_TOKEN](state, token: string): void {
        state.token = '';
        removeToken();
    },
};
export default mutations;
