import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import { useElementPlus } from "@/plugins/element-plus";
import JsonViewer from "vue3-json-viewer";
import { directive } from "@/utils/directives";
import "element-plus/dist/index.css";

const app = createApp(App);

directive(app);

app
  .use(store)
  .use(router)
  .use(JsonViewer)
  .use(useElementPlus)
  .use(ElementPlus, { size: "small", zIndex: 3000 })
  .mount("#app");
