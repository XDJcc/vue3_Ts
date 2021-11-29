<script setup lang="ts">
import { getMusicUrl, searchMusic } from "@/api/ cloudMusic";
import { ref } from "vue";

const keywords = ref("");
const musicUrl = ref('')
const searchClick = async (): void => {
  const {data} = await searchMusic({ keywords: keywords.value });
  const musicId = data.result.songs[0].id
  musicUrl.value = 'https://music.163.com/song/media/outer/url?id=28427753.mp3 '
  // const res =  await getMusicUrl({id:musicId})
  // console.log(res,'aaaaaaaaa');
};
</script>
<template>
  <el-row>
    <el-col :span="24">
      <el-input type="primary" v-model="keywords" clearable></el-input>
    </el-col>
  </el-row>
  <h1>this is test page</h1>
  <el-button type="primary" @click="searchClick"></el-button>
  <audio  :src="musicUrl" autoplay controls></Audio>
</template>

<style lang="scss" scoped>
* {
}
</style>
