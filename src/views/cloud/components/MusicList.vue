<script setup lang="ts">
import { Songs } from "@/api/cloudMusic/types";
import { fliterTime } from "@/utils/tools";

import { defineEmits, ref, watchEffect } from "vue";

const props = withDefaults(
  defineProps<{
    list: Songs[];
  }>(),
  { list: () => [] }
);
const emit = defineEmits(["playMusic"]);

const activeID = ref<number>(props.list.length > 0 && props.list[0].id);

const playMusic = ({ id, name }): void => {
  console.log(name);
  activeID.value = id;
  emit("playMusic", id);
};

watchEffect(() => {
  activeID.value = props.list.length > 0 ? props.list[0].id : null;
});
// console.log(props.list, "aaaaaaaaaaa");
</script>
<template>
  <div
    v-for="(item, index) in props.list"
    :key="item.id"
    @click="playMusic(item)"
  >
    <div :class="{ active: activeID === item.id, item }">
      {{ index + 1 }}、{{ item.name }} -- {{ item.artists[0].name }} --{{
        fliterTime(item.album.publishTime)
      }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
}
</style>
