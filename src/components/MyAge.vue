<script setup lang="ts">
import { ref } from "vue";

const myAge = ref<string>("张三今天是18岁生日");
</script>
<template>
  <el-row>
    <el-col :spam="6">
      {{myAge}}
    </el-col>
  </el-row>
</template>
<style lang="scss" scoped></style>
