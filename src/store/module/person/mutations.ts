/*
 *  Person_mutations
 * */
import { UPDATE_USER_INFO } from "@/store/module/person/person_type.ts";

const Person_mutations = {
  [UPDATE_USER_INFO]: (state, { data }: { data: number }) => {
    state.userWeight = data;
  },
};
export default Person_mutations;
