<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue";

export default defineComponent({
  setup() {
    return {};
  },
  components: {
    HelloWorld,
  },
});
</script>

<template>
  <div class="home">
    <h1>This is an home page</h1>
    <HelloWorld msg="天上人间" />
  </div>
</template>
