<template>
  <div class="container">
    <div>
      <h1>哎呀，找不到页面啦！
      </h1>
    </div>
    <div>
        <h5>
        <router-link to="/">回去吧</router-link>
      </h5>
    </div>
  </div>
</template>

<script>
export default {
  name: "404"
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

</style>
