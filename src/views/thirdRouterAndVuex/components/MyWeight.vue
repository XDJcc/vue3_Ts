<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";

const store = useStore();
const newName = ref<string>("");

const changeName = (): void => {
  if (!newName.value) {
    ElMessage.error("请输入正确的名称");
    return;
  }

  ElMessage.success("更新成功");
  const name = newName.value;
  store.dispatch("updateName", name);
  newName.value = "";
};
</script>

<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="4"> 用户名：<span style="color: #38a438">{{ store.state.name }}</span></el-col>
      <el-col :span="5">
        <el-input type="string" v-model="newName" clearable @keyup.enter="changeName"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="changeName">修改</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<style scoped></style>
