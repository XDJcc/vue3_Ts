<script setup lang="ts">
import {ref, withDefaults, watchEffect, nextTick, defineProps, onActivated} from "vue";
import {ElMessage} from "element-plus";
import {CloudApi} from "@/api/cloudMusic";
import {getMusicAllTime} from "@/utils/tools";
import MusicLyric from "./MusicLyric.vue";

const props = withDefaults(defineProps<{ musicUrl: string; id: number }>(), {});
const audioRef = ref<HTMLAudioElement>(null);

const finallyTime = ref<number>(null); //音乐总时长
const nowTime = ref<number>(0); //当前时长
const musicType = ref<boolean>(false); // 音乐的播放状态
const lyricList = ref<string[]>([]); //存储歌词的数组

//监听ID的变化获取新歌的歌词
watchEffect(() => {
  if (props.id) {
    nextTick(() => {
      getMusicDetail(props.id);
    });
  } else {
    //Id 不存在就清空歌词列表
    lyricList.value = [];
  }
});

//每一次切换音乐就获取当前音乐的 详细信息
const getMusicDetail = async (id): Promise<void> => {
  console.log("切换音乐为", id);
  musicType.value = true;
  await audioRef.value.play();
  const {
    lrc: {lyric},
  } = await CloudApi.getMusicLyric({id});
  lyricList.value = lyric.split("\n");
};

//播放上一首
const upMusic = (): void => {
  ElMessage.success("播放上一首");
};

//播放  /  暂停播放音乐
const pauseOrContine = (): void => {
  if(!props.id){
    return
  }
  musicType.value = !musicType.value;
  if (musicType.value) audioRef.value.play();
  else audioRef.value.pause();
};

//播放下一首歌
const nextMusic = (): void => {
  ElMessage.success("播放下一首");
};

//获取当前音乐总时长
const getDuration = (): void => {
  finallyTime.value = audioRef.value.duration;
};

//获取当前音乐的时长
const updateTime = (e) => {
  nowTime.value = e.target.currentTime;
};

watchEffect(() => {
  if (nowTime.value === finallyTime.value) musicType.value = false;
});

//拖动滑块
const dragProgress = (val) => {
  audioRef.value.currentTime = val;
  nowTime.value = val;
  if (val === finallyTime.value) {
    audioRef.value.pause();
    musicType.value = false;
  } else {
    audioRef.value.play();
    musicType.value = true;
  }
};

const volume = ref<number>(0.2);


onActivated(() => {
  musicType.value = false;
  // console.log(audioRef.value)
  if (audioRef.value != null) audioRef.value.play();
})
</script>

<template>
<!--  <MusicLyric :nowTime="nowTime" :lyricList="lyricList" v-if="id"></MusicLyric>-->
  <MusicLyric :nowTime="nowTime" :lyricList="lyricList" ></MusicLyric>
<!--  <div class="cointainer" v-if="id">-->
  <div class="cointainer">
    <div class="progress">
      <div class="start_time time_num">{{ getMusicAllTime(nowTime) }}</div>
      <el-slider
          v-model="nowTime"
          :max="finallyTime"
          :min="0"
          style="flex: 1"
          :step="0.01"
          @change="dragProgress"
          :disabled="!finallyTime"
          :show-tooltip="false"
      >
      </el-slider>
      <div class="finally_time time_num">
        {{ getMusicAllTime(finallyTime) }}
      </div>
    </div>
    <div class="change_music">
      <div class="volume">
        <el-icon size="25" style="margin: 0 10px">
          <headset/>
        </el-icon>
        <el-slider
            v-model="volume"
            style="width: 100px"
            :max="1"
            :min="0"
            :step="0.01"
        >
        </el-slider>
      </div>
      <div class="paly_pause">
        <div class="_icon" @click="upMusic">
          <el-icon size="25">
            <arrow-left-bold/>
          </el-icon>
        </div>
        <div class="_icon" @click="pauseOrContine">
          <el-icon v-show="musicType" size="30">
            <video-pause/>
          </el-icon>
          <el-icon v-show="!musicType" size="30">
            <video-play/>
          </el-icon>
        </div>
        <div class="_icon" @click="nextMusic">
          <el-icon size="25">
            <arrow-right-bold/>
          </el-icon>
        </div>
      </div>
      <div style="width: 150px;"></div>
    </div>
    <audio
        ref="audioRef"
        :src="props.musicUrl"
        :volume="volume"
        autoplay
        @canplay="getDuration"
        @timeupdate="updateTime"
    ></audio>
  </div>
</template>
<style scoped lang="scss">
.cointainer {
  width: 100%;
  height: 100px;
  background: #012728;
  color: #fafafa;
  //border-radius: 20px;
  padding-top: 10px;
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
  justify-content: space-between;

  .volume {
    width: 150px;
    display: flex;
    align-items: center;
  }

  .paly_pause {
    display: flex;
    align-items: center;
    justify-content: center;

    ._icon {
      margin: 0 30px;
    }
  }
}
</style>
