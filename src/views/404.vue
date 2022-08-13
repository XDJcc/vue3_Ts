<template>
  <div class="container">
    <h1>哎呀，找不到页面啦！
    </h1>
    <h5>
      <router-link to="/">回去吧</router-link>
    </h5>
  </div>
</template>

<script>
export default {
  name: "404"
}
</script>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
