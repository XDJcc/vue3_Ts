<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useRouter, useRoute, RouteRecordRaw } from "vue-router";
import routerList from "@/router/routers";
import { recAllRoute } from "@/utils/tools";

//获取路由实例
const router = useRouter();

//获取路由参数
const route = useRoute();

//获取所有路由 的 name
const routeList: Array<string> = recAllRoute(routerList);
// console.log('routeList => :',routeList);

//是否显示左上角的回到首页
const showHome = ref<boolean>(true);

//返回到首页
const goHome = (): void => {
  router.push({ path: "/" });
};

watchEffect((): void => {
  // console.log("route.name => :", route.name);
  showHome.value = routeList.includes(route.name as string);
});
</script>

<template>
  <el-affix :offset="20" v-show="showHome" class="goHome">
    <el-button type="primary" @click="goHome"></el-button>
  </el-affix>
  <router-view class="view" />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.goHome {
  position: fixed;
  right: 20px;
  bottom: 20px;
}
*{
  margin: 0;
  padding: 0;
}
.view{
  width: 100vw;
  height:100vh ;
}
.xx{
  width: 10px !important;
  height: 10px !important;
  border: 1px solid #b7d4a8 !important;
  // 开启绝对定位
  position: absolute !important;
  border-radius: 50% !important;
  background: #ab1d2f !important;
}
</style>
