<script setup lang="ts">
import { getMusicUrl, searchMusic } from "@/api/ cloudMusic";
import { ref } from "vue";
import { Rows, Songs } from "@/views/test/test";

const keywords = ref<string>(""); //关键字
const musicUrl = ref<string>(""); //播放音乐的Url
const songsList = ref<Songs[]>([]); //获取的音乐列表
//搜索事件
const searchClick = async (): void => {
  const {
    data: { result },
  }: { data: Rows<Songs> } = await searchMusic({
    keywords: keywords.value,
  });
  const musicId: number = result.songs[0].id;
  console.log(result);
  songsList.value = result.songs;
  musicUrl.value = `https://music.163.com/song/media/outer/url?id=${musicId}.mp3`;
  // const res = await getMusicUrl({ id: musicId });  // 接口需要验证 好像需要登录才能用
  // console.log(res, "aaaaaaaaa");
};

const clearSearch = (): void => {
  songsList.value = [];
  musicUrl.value = "";
};
</script>
<template>
  <el-row :gutter="20">
    <el-col :span="8">
      <el-input
        type="primary"
        v-model="keywords"
        clearable
        @keyup.enter="searchClick"
        @clear="clearSearch"
      ></el-input>
    </el-col>
    <el-col :span="8">
      <el-button type="primary" @click="searchClick">搜索</el-button>
    </el-col>
  </el-row>
  <el-row>
    <h1>{{ songsList[0] && songsList[0].name }}</h1>
  </el-row>
  <el-row>
    <img
      :src="songsList[0] && songsList[0].artists[0].img1v1Url"
      v-if="songsList[0] && songsList[0].artists[0].img1v1Url"
      width="500"
      height="500"
      alt=""
    />
  </el-row>
  <div>
    <audio
      :src="musicUrl"
      autoplay
      controls
      style="width: 100%; height: 50px"
    ></audio>
  </div>
</template>

<style lang="scss" scoped>
* {
}
</style>
