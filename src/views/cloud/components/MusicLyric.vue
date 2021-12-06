<script setup lang="ts">
import {
  computed,
  defineProps,
  onMounted,
  ref,
  watchEffect,
  withDefaults,
} from "vue";

const props = withDefaults(
  defineProps<{
    nowTime: number;
    lyricList: string[];
  }>(),
  {}
);
const detailName = ref<string>(""); //打开歌词面板
const onlyLyricList = ref<string[]>([]); //处理过后的歌词列表
const onlyTimeList = ref<number[]>([]); //处理过后的歌词列表
const scrollbarRef = ref(null); // 获取的scrollBar实例
const ifScrollBar = ref<boolean>(true); //是否允许滚动  鼠标滚动的时候不允许滚动

const nowTop = ref<number>(0); //当前歌词距离顶部的距离

const nowNum = ref<number>(0); //当前比放到第几行歌词

//对当前的歌词列表进行处理 => 获取仅存在歌词的歌词列表  和 只有时间的歌词列表
const disponseLyric = () => {
  let list: string[] = [];
  let timeList: number[] = [];
  props.lyricList.forEach((item) => {
    list.push(item.substr(11));
    const timeStr = item.substr(1, 8).split(":");
    const timeNum = Number(timeStr[0]) * 60 + Number(timeStr[1]);
    if (!timeList.includes(timeNum)) {
      timeList.push(timeNum);
    }
  });
  onlyLyricList.value = list;
  onlyTimeList.value = timeList;
};
//监听  lyricList 就执行对歌词列表进行处理函数
watchEffect(() => {
  if (props.lyricList) {
    detailName.value = null; //每一次处理歌词  关闭歌词面板
    disponseLyric();
  }
});

// 滚动 歌词列表
const scrollBarScroll = async (scrollTop: number) => {
  if (!scrollTop) return;
  if (scrollTop < nowTop.value) {
    const timer = setInterval(() => {
      if (scrollTop >= nowTop.value) clearInterval(timer);
      nowTop.value--;
      scrollbarRef.value && scrollbarRef.value.setScrollTop(nowTop.value);
    }, 10);
  } else {
    const timer = setInterval(() => {
      if (scrollTop <= nowTop.value) clearInterval(timer);
      nowTop.value++;
      scrollbarRef.value && scrollbarRef.value.setScrollTop(nowTop.value);
    }, 10);
  }
};

//根据当前是时间获取当前的歌词是第几条
let isNowTime = false;
let timer = null;
const getNowNum = () => {
  if (isNowTime) return;
  isNowTime = true;
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    let val = null;
    let list = onlyTimeList.value;
    list.forEach((item, index) => {
      if (props.nowTime > item && props.nowTime < list[index + 1]) {
        console.log("index", nowNum.value, index);
        if (nowNum.value !== index) {
          nowNum.value = index;
          scrollBarScroll(index * 30);
        }
      }
    });
    isNowTime = false;
  }, 500);
};
watchEffect(() => {
  if (props.nowTime) {
    getNowNum();
  }
});

const mouseScroll = (val: { scrollTop: number; scrollLeft: number }) => {
  nowTop.value = val.scrollTop;
  console.log("scrollTop", val.scrollTop);
};

onMounted(() => {
  console.log("Mounted");
});
</script>
<template>
  <el-collapse accordion v-model="detailName">
    <el-collapse-item name="lyric">
      <template #title>
        <div class="collapse_title">
          {{ props.lyricList[nowNum] }}
        </div>
      </template>
      <el-scrollbar height="400px" ref="scrollbarRef" @scroll="mouseScroll">
        <div class="lyric_wapper">
          <div
            v-for="(item, index) in onlyLyricList"
            :key="index"
            :class="['lyric_line', nowNum == index ? 'active_Lyric' : '']"
          >
            {{ item }}
          </div>
        </div>
      </el-scrollbar>
    </el-collapse-item>
  </el-collapse>
</template>

<style scoped lang="scss">
.collapse_title {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #f0ad4e;
  background: rgba(39, 40, 40, 0.96);
}
.lyric_wapper {
  padding: 190px 0;
  .lyric_line {
    width: 100%;
    height: 30px;
    font-size: 16px;
    line-height: 30px;
    color: #008c8a;
    text-align: center;
    user-select: none;
  }
  .active_Lyric {
    color: #002844;
    font-weight: bold;
    background: rgba(74, 142, 152, 0.52);
  }
}
</style>
