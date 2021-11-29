<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const handleOpen = (key, keyPath): void => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath): void => {
  console.log(key, keyPath);
};
</script>

<template>
  <el-row>
    <el-col :span="24">
      <el-menu
        style="height: 100vh"
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="1"
        text-color="#fff"
        router
        unique-opened
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="/main">
          <span>XDJcc</span>
        </el-menu-item>
        <el-sub-menu index="1">
          <template #title> Navigator Two</template>
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item one</el-menu-item>
          <el-menu-item index="1-3">item three</el-menu-item>
          <el-sub-menu index="1-4">
            <template #title>
              <div>
                <el-icon><document /></el-icon>
                item four
              </div>
            </template>
            <el-menu-item index="1-4-1">four one</el-menu-item>
            <el-menu-item index="1-4-2">four two</el-menu-item>
            <el-menu-item index="1-4-3">four three</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="/score">
          <span>贪吃蛇</span>
        </el-menu-item>
        <el-menu-item index="/test">
          <span>testDemo</span>
        </el-menu-item>
        <el-menu-item index="/first">
          <span>三级路由 VUEX</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
  <!--  <div class="home">-->
  <!--    <h1>This is an home page</h1>-->
  <!--    <HelloWorld msg="天上人间" />-->
  <!--    <el-button type="primary" @click="router.push('/first/myName')"-->
  <!--    >查看我的信息-->
  <!--    </el-button>-->
  <!--    <el-button type="primary" @click="router.push('/test')"-->
  <!--    >查看我的信息-->
  <!--    </el-button>-->
  <!--    <el-button type="primary" @click="router.push('/score')">贪吃蛇</el-button>-->
  <!--  </div>-->
</template>
