import state from "./state";
import action from "./action";
import mutations from "./mutations";
import getters from "./getter";

const cat = {
  state: () => state,
  action,
  mutations,
  getters,
};
export default cat;
