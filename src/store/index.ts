import { createStore } from "vuex";
import cat from "./module/cat";
import person from "./module/person";
import actions from "./actions";
import state from "@/store/state";
import mutations from "@/store/mutations";

const store = createStore({
  state: () => state,
  actions,
  mutations,
  modules: {
    person,
    cat,
  },
});
export default store;
