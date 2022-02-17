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
      age: 18
    });

    const mySayStr = ref<string>("我是谢大脚!!!");
    const mtName = ref<number>(23);
    return {
      mySayStr,
      mtName,
      ...toRefs(name)
    };
  }
});
</script>

<template>
  <div>

    <el-row>
      <el-col :span="10">
        <p>我的名字是：{{ name }}，我今年已经{{ age }}岁了。</p>
      </el-col>
    </el-row>


    <div class="linkWapper">
      <router-link class="routerLink" :to="{ name: 'ThirdRoute1' }" active-class="focusLink">切换三级路由组件</router-link>
      |
      <router-link class="routerLink" :to="{ name: 'ThirdRoute2' }" active-class="focusLink">修改用户名</router-link>
    </div>
    <router-view></router-view>
  </div>

</template>
<style scoped lang="scss">
.linkWapper {
  margin: {
    top: 30px;
    bottom: 10px;
  };
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;

  .routerLink {
    padding: 5px;
    color: #f2f2f2;
    text-decoration: none;
  }

  .focusLink {
    color: #f6d733;
  }
}

</style>
