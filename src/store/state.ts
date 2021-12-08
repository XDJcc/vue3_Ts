/*
 *  master_state
 * */


export interface Istate {
  name: string;
  isLogin: boolean;
}

const state: Istate = {
  name: "李四",
  isLogin: false,
};

export default state;
