/*
 *  master_mutations
 * */
import { LOGIN, UPDATE_NAME } from "./type";

const mutations = {
  [UPDATE_NAME](state, { data }: { data: string }): void {
    state.name = data;
  },
  [LOGIN](state, { data }: { data: boolean }): void {
    state.isLogin = data;
    localStorage.setItem("isLogin", `${data}`);
  },
};
export default mutations;
