<script setup lang="ts">
import { withDefaults, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

let props = withDefaults(defineProps<{ msg: string }>(), {
  msg: "我是谢大脚",
});

const sayName = ref<string>(props.msg + "，我是张三的好朋友");
</script>

<template>
  <div class="hello">
    <h1>{{ sayName }}</h1>
    <el-button type="primary" @click="router.push('/first/myName')"
      >查看我的信息</el-button
    >
    <el-button type="primary" @click="router.push('/test')"
      >查看我的信息</el-button
    >
    <el-button type="primary" @click="router.push('/score')">贪吃蛇</el-button>
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
