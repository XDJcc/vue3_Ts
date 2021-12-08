<script setup lang="ts">
import GameControl from "@/views/score/index";
import { inject, nextTick, onMounted } from "vue";

onMounted(() => {
  init();
});
let gameProto: unknown = null;

const init = async (): Promise<void> => {
  await nextTick();
  gameProto = new GameControl();
};

const isLoadNowDom: () => Promise<void> = inject("isLoadNowDom");

//开始新游戏
const openNewGame = (): void => {
  gameProto.isLive = false; //停止移动
  isLoadNowDom();
};
</script>
<template>
  <div class="container">
    <el-row type="flex" justify="center">
      <el-col :span="1">
        <el-button type="primary" @click="openNewGame">重新开始</el-button>
      </el-col>
    </el-row>
    <!--创建游戏的主容器-->
    <div class="main">
      <!--设置游戏的舞台-->
      <div class="stage">
        <!--设置蛇-->
        <div id="snake" class="snake">
          <!--snake内部的div 表示蛇的各部分-->
          <p id="foot" class="foot"></p>
          <div class="xx"></div>
          <div></div>
          <!--设置食物-->
        </div>
      </div>

      <!--设置游戏的积分牌-->
      <div id="score-panel" class="score-panel">
        <div id="scoreEle">Score:0</div>
        <div id="levelEle">Level:1</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$bg-color: #b7d4a8;
.container {
  width: 100%;
  min-height: 100%;
  box-sizing: border-box;
  overflow: hidden;
}

//设置主窗口的样式
.main {
  width: 360px;
  height: 420px;
  background-color: #b7d4a8;
  // 设置居中
  margin: 100px auto;
  // 设置边框
  border: 10px solid black;
  // 设置圆角
  border-radius: 40px;

  // 开启弹性盒模型
  display: flex;
  // 设置主轴的方向
  flex-flow: column;
  // 设置侧轴的对齐方式
  align-items: center;
  // 设置主轴的对齐方式
  justify-content: space-around;

  // 游戏舞台
  .stage {
    width: 304px;
    height: 304px;
    border: 2px solid black;
    // 开启相对定位
    position: relative;

    // 设置蛇的样式
    .snake {
      width: 100%;
      height: 100%;
      position: relative;
    }

    // 设置食物
    .foot {
      position: absolute;
      width: 10px;
      height: 10px;
      background-color: black;
    }
  }

  // 记分牌
  .score-panel {
    width: 300px;
    display: flex;
    // 设置主轴对齐方式
    justify-content: space-between;
  }
}
</style>
