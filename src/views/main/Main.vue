<script setup lang="ts">
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import { nextTick } from "vue";

const store = useStore();
const router = useRouter();
const removeLogin = () => {
  ElMessageBox.confirm("是否退出登陆?", "Warning", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      store.dispatch("login", false);

      nextTick(() => {
        router.push({ path: "/login" });
      }).then(() => {
        ElMessage({
          type: "success",
          message: "退出成功",
        });
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消操作",
      });
    });
};
</script>
<template>
  <h1>welcome to Xie Dajiao Home</h1>

  <el-button type="success" @click="removeLogin">退出登陆</el-button>
</template>

<style lang="scss" scoped></style>
