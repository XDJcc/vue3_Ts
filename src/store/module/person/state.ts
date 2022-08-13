/*
 *  Person_state
 * */
export interface Person_state {
  userList: userInfo[]; //管理员账号
  userWeight: number; //账号权重
}

type userInfo = {
  userId: string;
  password: string;
  IdWeight:number
};

const state: Person_state = {
  userList: [
    { userId: "admin", password: "123456", IdWeight: 9 },
    { userId: "test", password: "123456", IdWeight: 8 },
    { userId: "5", password: "123456", IdWeight: 5 },
    { userId: "4", password: "123456", IdWeight: 4 },
    { userId: "3", password: "123456", IdWeight: 3 },
  ],
  userWeight: null,
};
export default state;
