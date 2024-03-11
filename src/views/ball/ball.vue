<script lang="ts">
export default {
  name: "RunBall",
};
</script>
<script lang="ts" setup>
import { onActivated, onMounted, ref } from "vue";
import Ball, { random, randomColor } from "@/views/ball/ball.ts";

const wrapper = ref<HTMLElement>(null);
const canvas = ref<HTMLCanvasElement>(null);
type MyFunctionParams = Parameters<typeof onActivated>;

onActivated((hook: MyFunctionParams, target: MyFunctionParams) => {
  console.log("我是  OnActivated target", target);
  console.log("我是  OnActivated hook", hook);
});
onMounted(() => {
  initStart();
});

const initStart = () => {
  const ctx: CanvasRenderingContext2D = canvas.value.getContext("2d");
  console.log(wrapper.value.clientWidth);
  console.log(wrapper.value.clientHeight);
  console.log("输出宽高");
  const width = (canvas.value.width = wrapper.value.clientWidth);
  const height = (canvas.value.height = wrapper.value.clientHeight);

  let balls: Ball[] = [];

  while (balls.length < 40) {
    let size = random(5, 12);
    let ball = new Ball(
      // 为避免绘制错误，球至少离画布边缘球本身一倍宽度的距离
      random(0 + size, width - size),
      random(0 + size, height - size),
      random(-7, 7),
      random(-7, 7),
      randomColor(),
      size,
      ctx,
      width,
      height
    );
    balls.push(ball);
  }
  const loop = () => {
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < balls.length; i++) {
      balls[i].draw(ctx);
      balls[i].update();
    }
    requestAnimationFrame(loop);
  };
  loop();
};
</script>

<template>
  <div ref="wrapper" style="width: 100%; height: 100%">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<style scoped></style>
