<script setup lang="ts">
import { ref } from "vue";

const demo1x = ref(0);
const xCoordinate = (e) => {
  demo1x.value = e.clientX;
};

const demo2box = ref(true);
const changeDemo2 = () => {
  demo2box.value = !demo2box.value;
};

const demo3show = ref(true);
</script>
<template>
  <div class="demo_wapper">
    <div
      class="demo1"
      @mousemove="xCoordinate"
      :style="{ backgroundColor: `hsl(${demo1x}, 80%, 50%)` }"
    >
      <h3>Move your mouse</h3>
      <div class="box2">{{ demo1x }}</div>
    </div>
    <div class="demo2">
      <el-button type="primary" @click="changeDemo2">click</el-button>
      <transition name="my-demo">
        <div
          style="width: 100px; height: 100px; background: #0e9a00"
          v-show="demo2box"
        ></div>
      </transition>
    </div>
    <div class="demo3">
      <el-button type="primary" @click="demo3show = !demo3show">Toggle show</el-button>
      <transition name="bounce">
        <p v-if="demo3show" style="color:#006067">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
          facilisis enim libero, at lacinia diam fermentum id. Pellentesque
          habitant morbi tristique senectus et netus.
        </p>
      </transition>
    </div>
    <div class="demo4"></div>
    <div class="demo5"></div>
    <div class="demo6"></div>
    <div class="demo7"></div>
    <div class="demo8"></div>
    <div class="demo9"></div>
    <div class="demo10"></div>
    <div class="demo11"></div>
    <div class="demo12"></div>
    <div class="demo13"></div>
    <div class="demo14"></div>
    <div class="demo15"></div>
    <div class="demo16"></div>
    <div class="demo17"></div>
    <div class="demo18"></div>
    <div class="demo19"></div>
    <div class="demo20"></div>
  </div>
</template>

<style scoped lang="scss">
@mixin flexcenter_column {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
@mixin flexcenter {
  display: flex;
  align-items: center;
  justify-content: center;
}
.demo_wapper {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: flex-start;
  & > div {
    width: 290px;
    height: 240px;
    margin: 20px;
    box-shadow: 0px 0px 4px 0px rgba(63, 63, 63, 0.89);
    transition: box-shadow 0.25s ease-in;
  }
  & > div:hover {
    transform: translateY(-2px);
    box-shadow: 0px 0px 10px 0px rgba(63, 63, 63, 0.89);
    transition: all 0.35s ease-out;
  }

  & > div:hover {
    transition: transform 0.25s ease-in;
  }
}
.demo1 {
  @include flexcenter_column;
  transition: 0.2s background-color ease;
}
.demo2 {
  &>div{
    margin: 0 auto;
  }

  .my-demo-enter-active,
  .my-demo-leave-active {
    transition: all 0.5s ease;
  }
  .my-demo-enter-form,
  .my-demo-leave-to {
    opacity: 0;
  }
}
.demo3 {
  .bounce-enter-active {
    animation: bounce-in 0.5s;
  }
  .bounce-leave-active {
    animation: bounce-in 0.5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.25);
    }
    100% {
      transform: scale(1);
    }
  }
}
</style>
