<script lang="ts">
import { defineComponent, ref } from "vue";
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
    <HelloWorld />
  </div>
</template>
