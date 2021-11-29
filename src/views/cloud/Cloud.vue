<script setup lang="ts">
import { searchMusic } from "@/api/cloudMusic";
import { ref } from "vue";
import { Rows, Songs } from "@/views/cloud/types";

import MusicList from "./components/MusicList";

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

const searchInput = ref<HTMLElement | null>(null);
const resetSearch = (): void => {
  searchInput.value.clear();
};
const changeMusic = (id: number): void => {
  musicUrl.value = `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
};
</script>
<template>
  <div class="main">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input
          type="primary"
          v-model="keywords"
          clearable
          placeholder="请输入关键字搜索音乐"
          @keyup.enter="searchClick"
          @clear="clearSearch"
          ref="searchInput"
        ></el-input>
      </el-col>
      <el-col :span="8">
        <el-button type="primary" @click="searchClick">搜索</el-button>
        <el-button type="primary" @click="resetSearch">重置</el-button>
      </el-col>
    </el-row>
    <div class="music_list">
      <MusicList :list="songsList" @playMusic="changeMusic"></MusicList>
    </div>
    <div style="height: 100px;width: 1px"></div>
    <div class="audio" v-if="musicUrl">
      <audio :src="musicUrl" autoplay controls style="width: 100%"></audio>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-content: space-between;
  overflow: hidden;
}
.music_list {
  flex: 1;
  overflow-y: scroll;
}
.music_list::-webkit-scrollbar {
  display: none;
}
.audio {
  width: 80vw;
  position: fixed;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 20px;
  box-sizing: border-box;
  background: #fff;
}
</style>
