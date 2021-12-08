/*
 *  Person_getter
 * */

const Person_getter = {
  nowUserWeight(state) {
    let val = -1;
    if (state.userWeight !== null) {
      val = state.userWeight;
    } else if (localStorage.getItem("userWeight")) {
      val =Number(localStorage.getItem("userWeight"));
    }
    return val;
  },
};
export default Person_getter;
