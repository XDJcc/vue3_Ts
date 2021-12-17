<script setup lang="ts">
import CodeEditor from "./components/codeEditor";
import { reactive, ref } from "vue";
const code = ref("");
const type = "add";

const jsonStr = ref("");
const flowJSON = ref();
const changeValue = () => {
  flowJSON.value = JSON.parse( jsonStr.value);
};
</script>
<template>
  <h1>大家好，我是SQL富文本编辑器</h1>
  <div>
    <codeEditor
      v-model:value="code"
      :scene="type"
      :height-size="200"
    ></codeEditor>
  </div>
  <div style="margin: 20px 0">
    <el-button style="margin: 20px" type="primary" @click="changeValue">格式化</el-button>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-input
          type="textarea"
          :rows="20"
          placeholder="请输入内容"
          v-model="jsonStr"
        ></el-input>
      </el-col>
      <el-col :span="12">
        <json-viewer :value="flowJSON" copyable boxed sort></json-viewer>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss"></style>
