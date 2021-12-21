<script setup lang="ts">
import draggable from "vuedraggable";
import { ref } from "vue";

type firdType = { grid: string; num: number };
const gridLists = ref<Array<firdType>>([
  { grid: "cn", num: 1 },
  { grid: "cn", num: 2 },
  { grid: "cn", num: 3 },
  { grid: "cn", num: 4 },
  { grid: "cn", num: 5 },
  { grid: "cn", num: 6 },
  { grid: "cn", num: 7 },
  { grid: "cn", num: 8 },
  { grid: "cn", num: 9 },
]);
type listsType = {
  people:string,
  id:number,
  name:string
}
const  lists = ref<Array<listsType>>([
  { people: "cn", id: 1, name: "www.itxst.com" },
  { people: "cn", id: 2, name: "www.baidu.com" },
  { people: "cn", id: 3, name: "www.taobao.com" },
  { people: "cn", id: 4, name: "www.google.com" }
]);
const drag = ref(false);
const getEend = (e) => {
  console.log(e);
};
</script>
<template>
  <div class="drag-container">
    <el-row :gutter="20">
      <el-col :xs="25" :sm="8" :md="8" :lg="8">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>grid列表拖拽</span>
            </div>
          </template>
          <draggable
            v-model="gridLists"
            item-key="id"
            animation="300"
            chosenClass="chosen"
            forceFallback="true"
            class="grid-container"
            @change="getEend"
          >
            <template #item="{ element }">
              <div :class="'item' + ' ' + 'item-' + element.num">
                {{ element.num }}
              </div>
            </template>
          </draggable>
        </el-card>
      </el-col>      <el-col :xs="25" :sm="8" :md="8" :lg="8">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>grid列表拖拽</span>
            </div>
          </template>
          <!-- 单列拖拽 -->
          <draggable
            v-model="lists"
            item-key="name"
            @change="getEend"
            chosen-class="chosen"
            force-fallback="true"
            animation="300"
          >
            <template #item="{ element, index }">
              <div class="item-single">{{ element.name }} {{ index }}</div>
            </template>
          </draggable>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
/* grid列表拖拽 */
.grid-container {
  display: grid;
  grid-template-columns: 33.3% 33.3% 33.3%;
  grid-template-rows: 33.3% 33.3% 33.3%;
}

.item {
  font-size: 2em;
  text-align: center;
  line-height: 100px;
  border: 1px solid #e5e4e9;
  cursor: move;
}

.item-1 {
  background-color: #ef342a;
}

.item-2 {
  background-color: #f68f26;
}

.item-3 {
  background-color: #4ba946;
}

.item-4 {
  background-color: #0376c2;
}

.item-5 {
  background-color: #c077af;
}

.item-6 {
  background-color: #f8d29d;
}

.item-7 {
  background-color: #b5a87f;
}

.item-8 {
  background-color: #d0e4a9;
}

.item-9 {
  background-color: #4dc7ec;
}
.chosen {
  border: solid 2px #137fde !important;
}

.item-single {
  font-size: 1.5em;
  height: 77px;
  text-align: center;
  line-height: 85px;
  border: 1px solid #e5e4e9;
  cursor: move;
}

</style>
