<script setup lang="ts">
import { ref } from "vue";

const dialogVisible = ref<boolean>(false);
</script>
<template>
  <div class="drag-container">
    <el-card shadow="hover" header="拖动指令效果（v-drag）作用于 Dialog 对话框">
      <el-button type="primary" @click="dialogVisible = true" size="small">
        点击打开 Dialog
      </el-button>
    </el-card>
    <el-dialog v-model="dialogVisible" title="Tips" width="30%">
      <template #title class="dragHeader">
        <div
          v-drag="[
            '.drag-container .el-dialog',
            '.drag-container .el-dialog__header',
          ]"
        >
          拖动指令效果（v-drag）
        </div>
      </template>
      <p>鼠标放标题头进行 Dialog 对话框拖动</p>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false" size="small"
          >取 消</el-button
          >
          <el-button type="primary" @click="dialogVisible = false" size="small"
          >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
.drag-container {
  .drag-dom {
    position: relative;
    display: inline-block;

    .drag-header {
      display: inline-block;
    }
  }
}
</style>
<style>
.el-dialog__header {
  background: #0a0e14;
  color: #f2f2f2;
}
</style>
