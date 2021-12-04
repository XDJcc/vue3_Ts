<script setup lang="ts">
import { ref, watchEffect, nextTick, provide } from "vue";
import { useRouter, useRoute } from "vue-router";
import routerList from "@/router/routers";
import { recAllRoute } from "@/utils/tools";
import Home from "@/views/Home.vue";


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

const isLoad = ref<boolean>(true);
// console.log("isLoad=>:", isLoad);
const isLoadNowDom = async (): Promise<void> => {
  isLoad.value = false;
  await nextTick();
  isLoad.value = true;
};

//更新 router-view 实现贪吃蛇 开始新的游戏
provide("isLoadNowDom", isLoadNowDom);

watchEffect((): void => {
  // console.log("route.name => :", route.name);
  showHome.value = routeList.includes(route.name as string);
});
</script>

<template>
  <el-affix :offset="20" v-show="showHome" class="goHome">
    <el-button type="primary" @click="goHome"></el-button>
  </el-affix>
  <div class="app">
    <Home class="nav_List"></Home>
    <div class="view">
      <router-view v-if="isLoad" />
    </div>
  </div>
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

.app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;

  .nav_List {
    width: 20vw;
    height: 100%;
  }

  .view {
    width: 80vw;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    overflow-y: scroll;
    overflow-x: hidden;
  }
}

//贪吃蛇继承 样式
* {
  margin: 0;
  padding: 0;
}
.xx {
  width: 10px !important;
  height: 10px !important;
  border: 1px solid #b7d4a8 !important;
  // 开启绝对定位
  position: absolute !important;
  border-radius: 50% !important;
  background: #ab1d2f !important;
}
</style>
