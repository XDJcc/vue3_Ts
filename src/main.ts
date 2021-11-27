import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { useElementPlus } from "@/plugins/element-plus";
import "element-plus/dist/index.css";

createApp(App)
  .use(store)
  .use(router)
  // .use(ElementPlus, { size: "small", zIndex: 3000 })
  .use(useElementPlus)
  .mount("#app");
