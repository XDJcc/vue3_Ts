<script setup lang="ts">
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {ref} from "vue";
import {ElMessage} from "element-plus";
import {verifyUserIdentity} from "@/utils/tools";

const store = useStore();
const router = useRouter();

//登陆账号
const loginUser = async () => {
  if (!userID.value || !userPassword.value) {
    ElMessage({
      type: "error",
      message: "信息错误",
      duration: 1500,
    });
    return;
  }
  if (!verifyUserIdentity(userID.value, userPassword.value)) {
    ElMessage({
      type: "warning",
      message: "临时权限登陆！！",
    });
  }
  await store.dispatch("login", true);
  await store.dispatch('mockLogin')
  await router.push({path: "/"});
  // console.log('asdasdasdasdasda', store.state.isLogin);

};

//重置操作
const logOut = () => {
  userID.value = "";
  userPassword.value = "";
};

const userID = ref<string>("admin");
const userPassword = ref<string>("123456");
// const userID = ref<string>("test");
// const userPassword = ref<string>("123456");

</script>
<template>
  <div class="login_container">
    <div class="wapper">
      <el-row>
        <el-col :span="4"> 账号：</el-col>
        <el-col :span="16">
          <el-input v-model.trim="userID"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4"> 密码：</el-col>
        <el-col :span="16">
          <el-input v-model.trim="userPassword" type="password"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-button type="primary" @click="loginUser">登陆</el-button>
        </el-col>
        <el-col :span="12">
          <el-button type="primary" @click="logOut">重置</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<style scoped lang="scss">
.wapper {
  width: 500px;
  height: 400px;
  background: rgba(50, 69, 91, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;

  .el-row {
    margin: 20px;

    .el-col {
      min-width: 50px;
    }
  }
}

.login_container {
  width: 100vw;
  height: 100vh;
  //background-image: url("https://pic.netbian.com/uploads/allimg/210925/235150-163258511050e3.jpg");
  background-size: 100%;
  background-color: #81d8d0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
