<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
const router  = useRouter()
const name = ref<string>("大家好我是胡汉三");
const goSearchMusic = ()=>{
  router.push({path:'/cloud'})
}
</script>
<template>
  <h1>this page is test demo</h1>
  <h2>{{ name }}</h2>
  <el-button @click="goSearchMusic">音乐</el-button>
</template>

<style lang="scss" scoped>
* {
}
</style>
