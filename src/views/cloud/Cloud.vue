<script setup lang="ts">
import { CloudApi } from "@/api/cloudMusic";
import { ref } from "vue";
import { Songs } from "@/api/cloudMusic/types";
import MusicList from "./components/MusicList.vue";
import PlayDetail from "./components/PlayDetail.vue";

const keywords = ref<string>(""); //关键字
const musicUrl = ref<string>(""); //播放音乐的Url
const songsList = ref<Songs[]>([]); //获取的音乐列表
const selectMusicId = ref<number>(null);

//搜索事件
const searchClick = async (): Promise<void> => {
  const { result, code } = await CloudApi.searchMusic({
    keywords: keywords.value,
  });
  if (result && code == 200) {
    const musicId: number = result.songs[0].id;
    console.log("获取的歌曲列表", result);
    songsList.value = result.songs;
    selectMusic(musicId);
  }
  // const res = await getMusicUrl({ id: musicId });  // 接口需要验证 好像需要登录才能用
  // console.log(res, "aaaaaaaaa");
};

//生成当前播放的音乐路径 更新ID 获取新的歌词信息
const selectMusic = (musicId) => {
  selectMusicId.value = musicId;
  musicUrl.value = `https://music.163.com/song/media/outer/url?id=${musicId}.mp3`;
};

//重置搜索
const clearSearch = (): void => {
  songsList.value = [];
  musicUrl.value = "";
  selectMusicId.value = null;
};

const searchInput = ref(null);

//关闭音乐
const resetSearch = (): void => {
  searchInput.value.clear();
};

//切换音乐
const changeMusic = (id: number): void => {
  selectMusicId.value = id;
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
      <el-scrollbar>
        <MusicList :list="songsList" @playMusic="changeMusic"></MusicList>
      </el-scrollbar>
    </div>
    <PlayDetail :musicUrl="musicUrl" :id="selectMusicId"></PlayDetail>
    <!--    <div style="height: 100px; width: 1px"></div>-->
    <!--    <div class="audio" v-if="musicUrl">-->
    <!--      <audio :src="musicUrl" autoplay controls style="width: 100%"></audio>-->
    <!--    </div>-->
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
