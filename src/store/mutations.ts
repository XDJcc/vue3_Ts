/*
 *  master_mutations
 * */
import { UPDATE_NAME } from "./type";
import {} from "vuex";


export default {
  // @typescript-eslint/explicit-module-boundary-types
  [UPDATE_NAME](state, { data }: { data: string }):void {
    state.name = data;
  },
};
