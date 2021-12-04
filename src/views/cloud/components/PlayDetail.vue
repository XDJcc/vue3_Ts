<script setup lang="ts">
import {
  defineProps,
  ref,
  withDefaults,
  onBeforeMount,
  watchEffect,
} from "vue";
import { ElMessage } from "element-plus";
import { CloudApi } from "@/api/cloudMusic";
import { Rows } from "@/api/cloudMusic/types";

const props = withDefaults(defineProps<{ musicUrl: string; id: number }>(), {});

const percentage = ref<number>(0); // 进度条的百分之比
const musicType = ref<boolean>(false); // 音乐的播放状态
const timer = ref(null); //定时器实例

watchEffect(() => {
  if (props.id) {
    getMusicDetail(props.id);
  }
});
//每一次切换音乐就获取当前音乐的 详细信息
const getMusicDetail = async (id): Promise<void> => {
  console.log("切换音乐为", id);
  const res = await CloudApi.getMusicLyric({ id });
  console.log(`音乐ID 为 ${id}`,res);
};
//定时器内部的函数用来更新进度条的长度
const playProgress = (): void => {
  percentage.value += percentage.value / (3 * 60 + 50);
};
//设置定时器 返回定定时器的返回值
const setTime = (time = 1000) => {
  let timer = setInterval(playProgress, time);
  return timer;
};

const upMusic = (): void => {
  ElMessage.success("播放上一首");
};
const pauseOrContine = (): void => {
  musicType.value = !musicType.value;
  if (timer.value) clearInterval(timer.value);
  let msg = "";
  if (musicType.value) {
    msg = "继续播放";
    timer.value = setTime();
  } else {
    msg = "暂停播放";
  }
  ElMessage.success(msg);
};
const nextMusic = (): void => {
  ElMessage.success("播放下一首");
};

onBeforeMount(() => {
  //组件卸载清除定时器
  clearInterval(timer.value);
});
</script>

<template>
  <div class="cointainer">
    <div class="progress">
      <div class="start_time time_num">00:00</div>
      <el-progress
        :percentage="percentage"
        style="flex: 1"
        :show-text="false"
        color="#333"
      >
      </el-progress>
      <div class="finally_time time_num">03:50</div>
    </div>
    <div class="change_music">
      <div class="_icon" @click="upMusic">
        <el-icon size="25"><arrow-left-bold /></el-icon>
      </div>
      <div class="_icon" @click="pauseOrContine">
        <el-icon v-show="musicType" size="30"><video-pause /></el-icon>
        <el-icon v-show="!musicType" size="30"><video-play /></el-icon>
      </div>
      <div class="_icon" @click="nextMusic">
        <el-icon size="25"><arrow-right-bold /></el-icon>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.cointainer {
  width: 100%;
  height: 100px;
  background: #0bdee3;
}
.progress {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .time_num {
    margin: 0 10px;
    font-size: 12px;
  }
}

.change_music {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  ._icon {
    margin: 0 30px;
  }
}
</style>
