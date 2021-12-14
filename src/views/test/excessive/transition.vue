<script setup lang="ts">
import { ref } from "vue";
import { gsap } from "gsap";

const demo1x = ref(0);
const demo1y = ref(0);
const xCoordinate = (e) => {
  demo1x.value = e.clientX;
  demo1y.value = e.clientY;
};

const demo2box = ref(true);
const changeDemo2 = () => {
  demo2box.value = !demo2box.value;
};

const demo3show = ref(true);

const demo4show = ref(false);
const demo4beforeEnter = (el) => {
  gsap.set(el, {
    scaleX: 0.8,
    scaleY: 1.2,
  });
};
const demo4enter = (el, done) => {
  gsap.to(el, {
    duration: 4,
    scaleX: 2,
    scaleY: 0.7,
    opacity: 1,
    x: 100,
    ease: "elastic.inOut(20, 1)",
    onComplete: done,
  });
};
const demo4leave = (el, done) => {
  gsap.to(el, {
    duration: 0.7,
    scaleX: 1,
    scaleY: 1,
    x: 200,
    ease: "elastic.inOut(2.5, 1)",
  });
  gsap.to(el, {
    duration: 0.2,
    delay: 0.5,
    opacity: 0,
    onComplete: done,
  });
};
</script>
<template>
  <div class="demo_wapper">
    <div
      class="demo1"
      @mousemove="xCoordinate"
      :style="{ backgroundColor: `rgb(${demo1x}, ${demo1y}, 200)` }"
    >
      <h3>Move your mouse</h3>
      <div class="box2">x:{{ demo1x }}</div>
      <div class="box2">y:{{ demo1y }}</div>
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
      <el-button type="primary" @click="demo3show = !demo3show"
        >Toggle show</el-button
      >
      <transition name="bounce">
        <p v-if="demo3show" style="color: #006067">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
          facilisis enim libero, at lacinia diam fermentum id. Pellentesque
          habitant morbi tristique senectus et netus.
        </p>
      </transition>
    </div>
    <div class="demo4">
      <el-button type="primary" @click="demo4show = !demo4show">
        Toggle
      </el-button>

      <transition
        @beforeEnter="demo4beforeEnter"
        @enter="demo4enter"
        @leave="demo4leave"
        :css="false"
      >
        <div v-if="demo4show" class="box"></div>
      </transition>
    </div>
    <div class="demo5">

    </div>
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
  & > div {
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
.demo4 {
  .box {
    width: 30px;
    height: 30px;
    background: teal;
    margin-top: 20px;
  }
}
</style>
