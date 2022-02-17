<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();
const name = ref<string>("大家好我是胡汉三");
name.value = store.state.name;
const goSearchMusic = () => {
  router.push({ path: "/cloud" });
};
</script>
<template>
  <h1>this page is test demo</h1>
  <h2>{{ name }}</h2>
  <el-button type="primary" @click="goSearchMusic"> 前 往 音 乐 界 面</el-button>
</template>

<style lang="scss" scoped>
* {
  margin: {
    bottom: 10px;
  };
}
</style>
