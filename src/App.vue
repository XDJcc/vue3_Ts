<script setup lang="ts">
import { ref, watchEffect, nextTick, provide, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import routerList from "@/router/routers";
import { recAllRoute } from "@/utils/tools";
import Home from "@/views/Home.vue";
import { useStore } from "vuex";

//获取路由实例
const router = useRouter();
const store = useStore();
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


const $refreshRouterViewType = ref(true)
const isLoadNowDom = async (): Promise<void> => {
  $refreshRouterViewType.value = false;
  await nextTick();
  $refreshRouterViewType.value = true;
};

//更新 router-view 实现贪吃蛇 开始新的游戏
provide("isLoadNowDom", isLoadNowDom);

watchEffect((): void => {
  // console.log("route.name => :", route.name);
  showHome.value = routeList.includes(route.name as string);
});

const isLogin = computed(() => {
  let isLogin: boolean = null;
  if (store.state.isLogin) isLogin = true;
  else {
    isLogin = JSON.parse(localStorage.getItem("isLogin"));
  }
  return isLogin;
});
const userWeight = ref<number>(store.getters.nowUserWeight);
watchEffect(() => {
  userWeight.value = store.getters.nowUserWeight;
});
</script>

<template>
  <el-affix :offset="20" v-show="showHome" class="goHome">
    <el-button type="primary" @click="goHome">{{ userWeight }}</el-button>
  </el-affix>
  <div class="app">
    <Home class="nav_List" v-if="isLogin"></Home>
    <div :class="[{ is_login: isLogin }, 'view']">
      <div :class="[isLogin ? 'router_view' : '_router']">
        <router-view v-if="$refreshRouterViewType" />
      </div>
      <div class="footer"  v-if="isLogin">XDJcc</div>
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
* {
  margin: 0;
  padding: 0;
}
.goHome {
  position: fixed;
  right: 20px;
  top: 20px;
}

.app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  .nav_List {
    width: 200px;
    height: 100%;
  }

  .view {
    flex: 1;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
  }
  .is_login {
    //padding: 20px;
  }

  .router_view {
    width: calc(100% - 40px) ;
    height: calc(100% - 40px);
    padding: {
      top: 20px;
      left: 20px;
      right: 20px;
      bottom: 0;
    }
    overflow-y: scroll;
    overflow-x: hidden;
  }
  ._router{
    width: 100%;
    height: 100%;
  }
  .router_view::-webkit-scrollbar {
    display: none;
  }

  .footer {
    width: 100%;
    height: 20px;
    line-height: 20px;
    text-align: center;
    background: rgba(170, 170, 170, 0.76);
  }
}

//贪吃蛇继承 样式

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
