<script setup lang="ts">
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

//登陆账号
const loginUser = () => {
  store.dispatch("login", true);
  setTimeout(() => {
    console.log(store.state.isLogin);
    router.push({ path: "/" });
  }, 0);
};
</script>
<template>
  <div class="login_container">
    <div class="wapper">
      <el-button type="primary" @click="loginUser">登陆</el-button>
    </div>
  </div>
</template>
<style scoped lang="scss">
.wapper{
  width: 500px;
  height: 400px;
  background: #216ec5;
  margin: auto;
}
.login_container {
  width: 100vw;
  height: 100vh;
  background-image: url("../assets/img/login_bg.jpg");
  background-size: 100%;
}
</style>
