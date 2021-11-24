<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";

const store = useStore();
const myWeight = ref<string>("张三的体重是180斤");
const newName = ref<string>("");

const changeName = ():void => {
  if(!newName.value){
    ElMessage.error("请输入正确的名称");
    return
  }

  ElMessage.success("更新成功");
  const name = newName.value;
  store.dispatch("updateName", name);
  newName.value = "";
};
</script>

<template>
  <div>
    {{ myWeight }}
    {{ store.state.name }}
    <el-row>
      <el-col :span="5">
        <el-input type="string"  v-model="newName" clearable></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="changeName">修改</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<style scoped></style>
