/*
 *  master_mutations
 * */
import {} from "vuex";


export default {
  ['UPDATE_NAME'](state:any,name:string){
    state.name = name
  },
};
