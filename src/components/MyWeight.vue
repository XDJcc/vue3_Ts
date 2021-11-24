<script setup lang="ts">
import {ref} from "vue";

const myWeight = ref<string>('张三的体重是180斤')
</script>

<template>
  <div>
    {{myWeight}}
  </div>
</template>
<style scoped>

</style>