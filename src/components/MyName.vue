<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";

export default defineComponent({
  name: "MyName",
  setup() {
    type Person = {
      name?: string;
      age: number;
    };

    const name = reactive<Person>({
      name: "张三",
      age: 18,
    });

    const mySayStr = ref<string>("我是谢大脚!!!");
    const mtName = ref<number>(23);
    return {
      mySayStr,
      mtName,
      ...toRefs(name),
    };
  },
});
</script>

<template>
  <el-row>
    <el-col :span="10">
      <p>我的名字是：{{ name }}，我今年已经{{ age }}岁了。</p>
    </el-col>
  </el-row>

  <router-link :to="{name:'ThirdRoute1'}">ThirdRoute1</router-link>
  |
  <router-link :to="{name:'ThirdRoute2'}">ThirdRoute2</router-link>
  <router-view></router-view>
</template>
<style scoped lang="scss"></style>
