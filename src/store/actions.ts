/*
 *   master_action
 * */
import {Commit} from "vuex";

import {UPDATE_NAME, LOGIN, SET_TOKEN, REMOVE_TOKEN} from "./type";
import UserApi from "@/api/user";
import store from "@/store/index";

const actions = {
    mockLogin({commit}) {
        UserApi.mockLogin(
            {
                username: "admin",
                password: "yt@123456",
                code: "1111",
                uuid: ""
            }
        ).then((res) => {
            store.dispatch('setToken', res.token).then(r => '');
        })
    },
    mockLoginOut({commit}) {
        UserApi.mockLoginOut().then(res => {
            store.dispatch('removeToken', res.token).then(r => '');
        })
    },
    setToken({commit}, token: string) {
        commit(SET_TOKEN, token);
    },
    removeToken({commit}) {
        commit(REMOVE_TOKEN);
    },
    updateName({commit}: { commit: Commit }, data: string) {
        setTimeout(() => {
            commit(UPDATE_NAME, {data});
        }, 0);
    },
    login({commit}: { commit: Commit }, data: boolean) {
        commit(LOGIN, {data});
    },

};
export default actions;
