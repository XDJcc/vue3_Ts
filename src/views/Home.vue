<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";

const router = useRouter();
const route = useRoute();
const handleOpen = (key, keyPath): void => {
  // console.log(key, keyPath);
};
const handleClose = (key, keyPath): void => {
  // console.log(key, keyPath);
};
const activeMenu = computed((): string => {
  const { path } = route;
  return path;
});
</script>

<template>
  <el-row>
    <el-col :span="24">
      <el-menu
        style="height: 100vh"
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        :default-active="activeMenu"
        text-color="#fff"
        router
        @open="handleOpen"
        @close="handleClose"
      >
        <!--        unique-opened  只允许打开一个-->
        <el-menu-item index="/main">
          <span>XDJcc</span>
        </el-menu-item>

        <el-sub-menu index="2">
          <template #title>Cloud_Music</template>
          <el-menu-item index="/cloud"><span>搜索音乐</span></el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="3">
          <template #title>Gluttonous Snake</template>
          <el-menu-item index="/score">
            <span>贪吃蛇</span>
          </el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="4">
          <template #title>Test Component</template>
          <el-menu-item index="/test/dragDialog">
            <span>拖动指令</span>
          </el-menu-item>
          <el-menu-item index="/test/splitPanes">
            <span>分栏</span>
          </el-menu-item>
          <el-menu-item index="/test/richText">
            <span>SQL富文本</span>
          </el-menu-item>
          <el-menu-item index="/test/dragList">
            <span>元素拖动</span>
          </el-menu-item>
          <el-menu-item index="/test">
            <span>路由跳转</span>
          </el-menu-item>
          <el-menu-item index="/test/transition">
            <span>过度动画</span>
          </el-menu-item>
          <el-menu-item index="/first">
            <span>VUEX 三级路由</span>
          </el-menu-item>

        </el-sub-menu>

        <!--组件测试-->
        <el-sub-menu index="1">
          <template #title>Multi-menu</template>
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item one</el-menu-item>
          <el-menu-item index="1-3">item three</el-menu-item>
          <el-sub-menu index="1-4">
            <template #title>
              <div>
                <el-icon>
                  <document />
                </el-icon>
                item four
              </div>
            </template>
            <el-menu-item index="1-4-1">four one</el-menu-item>
            <el-menu-item index="1-4-2">four two</el-menu-item>
            <el-menu-item index="1-4-3">four three</el-menu-item>
            <el-menu-item index="1-4-3">four three</el-menu-item>
            <el-menu-item index="1-4-3">four three</el-menu-item>
            <el-menu-item index="1-4-3">four three</el-menu-item>
            <el-menu-item index="1-4-3">four three</el-menu-item>
            <el-menu-item index="1-4-3">end</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
      </el-menu>
    </el-col>
  </el-row>
</template>
<style lang="scss">
/* 去除滚动条 */
::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
  color: transparent;
}
</style>
