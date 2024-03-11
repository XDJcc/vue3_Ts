<template>
  <div class="splitpanes-container">
    <el-card header="splitpanes 窗格拆分器" shadow="hover">
      <el-alert
        :closable="false"
        effect="dark"
        title="感谢优秀的 `splitpanes`，项目地址：https://github.com/antoniandre/splitpanes"
        type="warning"
      ></el-alert>
      <splitpanes
        class="default-theme"
        style="height: 500px"
        @resize="paneSize = $event[0].size"
      >
        <pane :size="32"> 1</pane>
        <pane :size="36">
          <splitpanes :horizontal="true" class="default-theme">
            <pane :size="100"> 2</pane>
            <pane :size="100"> 3</pane>
          </splitpanes>
        </pane>
        <pane :size="32"> 4</pane>
      </splitpanes>
    </el-card>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from "vue";
import { Pane, Splitpanes } from "splitpanes";
import "splitpanes/dist/splitpanes.css";

export default {
  name: "funSplitpanes",
  components: { Splitpanes, Pane },
  setup() {
    const state = reactive({
      paneSize: 50,
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.splitpanes__pane {
  justify-content: center;
  align-items: center;
  display: flex;
  position: relative;
  font-size: 70px;
  color: var(--color-primary-light-5);
  border: 1px solid #ebeef5;
}
</style>
