import { createStore } from "vuex";
import cat from "./module/cat";
import person from "./module/person";
import actions from "./actions";
import state from "@/store/state";
import mutations from "@/store/mutations";

export default createStore({
  state,
  actions,
  mutations,
  modules: {
    cat,
    person,
  },
});
