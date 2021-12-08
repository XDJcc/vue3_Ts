/*
 *  Person_action
 * */

import { UPDATE_USER_INFO } from "@/store/module/person/person_type";

const Person_action = {
  updateUserInfo: function ({ commit }, data: number): Promise<void> {
    return new Promise((resolve, reject) => {
      localStorage.setItem("userWeight", `${data}`);
      commit(UPDATE_USER_INFO, { data });
      resolve();
    });
  },
};
export default Person_action;
