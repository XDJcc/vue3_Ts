/*
 *  master_mutations
 * */
import { UPDATE_NAME } from "./type";

export default {
  [UPDATE_NAME](state: any, { data }: { data: string }) {
    state.name = data;
  },
};
