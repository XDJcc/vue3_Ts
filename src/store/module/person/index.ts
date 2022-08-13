import state from "./state";
import actions from "./action";
import getters from "./getter";
import mutations from "./mutations";

const person: { mutations: any; state: any; getters: { nowUserWeight(state): number }; actions: { updateUserInfo: ({commit}: { commit: any }, data: number) => Promise<void> } } = {
  state,
  actions,
  mutations,
  getters,
};
export default person;
