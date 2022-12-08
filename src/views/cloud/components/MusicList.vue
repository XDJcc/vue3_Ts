<script setup lang="ts">
import {Songs} from "@/api/cloudMusic/types";
import {fliterTime} from "@/utils/tools";

import {defineEmits, PropType, ref, watchEffect} from "vue";

const props = withDefaults(
    defineProps<{
      list: Songs[];
    }>(),
    {list: () => []}
);
console.log('xcccc====>' + props.list)

const emit = defineEmits(["playMusic"]);

const activeID = ref<number>(props.list.length > 0 ? props.list[0].id : null);

const changeMusic = ({id, name}): void => {
  activeID.value = id;
  emit("playMusic", id);
};

watchEffect(() => {
  activeID.value = props.list.length > 0 ? props.list[0].id : null;
});
</script>

<template>
  <div
      v-for="(item, index) in props.list"
      :key="item.id"
      @dblclick="changeMusic(item)"
  >
    <div :class="{ active: activeID === item.id, item }">
      {{ index + 1 }}、{{ item.name }} -- {{ item.al.name }}
      <!--      {{ item.artists[0].name }} &#45;&#45;-->
      <!--      {{-->
      <!--        fliterTime(item.album.publishTime)-->
      <!--      }}-->
    </div>
  </div>
</template>

<style lang="scss" scoped>
@mixin notSelect {
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  -khtml-user-select: none; /*早期浏览器*/
  user-select: none;
}

.active {
  background: rgba(230, 122, 42, 0.3);
  color: #000;
}

.item {
  height: 30px;
  margin: 10px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  line-height: 30px;
  @include notSelect;
}

.item:hover {
  background: rgba(230, 122, 42, 0.1);
}
</style>
