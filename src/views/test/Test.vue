<script setup lang="ts">
import { ref } from "vue";

const name = ref<string>("大家好我是胡汉三");
</script>
<template>
  <h1>this page is test demo</h1>
  <h2>{{ name }}</h2>
</template>

<style lang="scss" scoped>
* {
}
</style>
