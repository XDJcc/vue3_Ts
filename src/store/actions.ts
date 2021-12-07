/*
 *   master_action
 * */
import { Commit } from "vuex";

import { UPDATE_NAME, LOGIN } from "./type";

const actions = {
  updateName({ commit }: { commit: Commit }, data: string) {
    setTimeout(() => {
      commit(UPDATE_NAME, { data });
    }, 0);
  },
  login({ commit }: { commit: Commit }, data: boolean) {
    setTimeout(() => {
      localStorage.setItem("isLogin", `${data}`);
      commit(LOGIN, { data });
    }, 0);
  },
};
export default actions;
