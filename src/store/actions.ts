/*
 *   master_action
 * */
import { Commit } from "vuex";

import { UPDATE_NAME } from "./type";

const actions = {
  updateName({ commit }: { commit: Commit }, data: string) {
    setTimeout(() => {
      commit(UPDATE_NAME, { data });
    }, 0);
  },
};
export default actions;
