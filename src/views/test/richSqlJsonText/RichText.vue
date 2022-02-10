<script setup lang="ts">
import CodeEditor from "../components/codeEditor.vue";
import { reactive, ref } from "vue";
const code = ref("");
const type = "add";

const jsonStr = ref("");

const flowJSON = ref();

const getJsonVal = () => {
  jsonStr.value =
    '{"errno":0,"errmsg":"ok","data":{"log_id":"4370368987056300930","action_rule":{"pos_1":[],"pos_2":[],"pos_3":[]}}}';
};
const changeValue = () => {
  flowJSON.value = JSON.parse(jsonStr.value);
};
const clearJsonInit = () => {
  jsonStr.value = "";
  flowJSON.value = "";
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
    <el-button style="margin: 20px" type="primary" @click="getJsonVal"
      >获取测试JSON内容</el-button
    >
    <el-button style="margin: 20px" type="primary" @click="changeValue"
      >格式化JSON</el-button
    >
    <el-button style="margin: 20px" type="primary" @click="clearJsonInit"
      >清空JOSN内容</el-button
    >
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
