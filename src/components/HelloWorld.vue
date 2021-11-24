
<script setup lang="ts">
import { defineProps, withDefaults } from "vue";

const props = withDefaults(defineProps<{ msg: string }>(), {
  msg: "我是谢大脚",
});
</script>

<template>
  <div class="hello">
    <el-button type="primary" @click="$router.push('/first/myName')">查看我的信息</el-button>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
