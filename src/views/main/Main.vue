<script setup lang="ts">
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import { nextTick, onMounted, ref } from "vue";
import useEchar from "@/plugins/echarts";
import { option } from "@/utils/tools/echartsOptions.ts";

console.log("option===>", option);
const store = useStore();
const router = useRouter();
// const $refrech:()=>Promise<void> = inject("isLoadNowDom");
const removeLogin = () => {
  ElMessageBox.confirm("是否退出登陆?", "Warning", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      store.dispatch("login", false);
      store.dispatch("updateUserInfo", -1);
      nextTick(() => {
        // window.location.reload()
        // $refrech()
        setTimeout(() => {
          router.push({ path: "/login" });
        }, 1);
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

const toLoginPage = () => {
  router.push({ path: "/login" });
};

onMounted(async () => {
  const myOptions = {
    title: { text: "XDJcc的图表" },
    tooltip: {},
    xAxis: {
      data: ["12-3", "12-4", "12-5", "12-6", "12-7", "12-8"],
    },
    yAxis: {},
    series: [
      {
        name: "用户量",
        type: "line",
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  };
  const { init_chart } = await useEchar(myOptions, "init_chart");
  console.log("生成图标函数返回的图标实例", init_chart.value);
  const { init_chart2 } = await useEchar(option, "init_chart2");
});
</script>
<template>
  <div style="width: 100%">
    <el-row>
      <h1>welcome to Xie Dajiao Home</h1>
    </el-row>
    <el-row>
      <el-button type="success" @click="removeLogin">退出登陆</el-button>
      <el-button type="success" @click="toLoginPage">进入登录界面</el-button>
    </el-row>
    <el-row>
      <div id="init_chart" :style="{ width: '800px', height: '300px' }"></div>
    </el-row>
    <el-row>
      <div id="init_chart2" :style="{ width: '600px', height: '600px' }"></div>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.el-row {
  margin: {
    bottom: 20px;
  }
}
#init_chart2 {
  margin: 10px;
  border: 1px silver solid;
}
</style>
