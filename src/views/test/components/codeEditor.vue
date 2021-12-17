<template>
  <div class="in-coder-panel">
    <textarea
      style="height: 100% !important"
      ref="textarea"
      v-model="code"
    ></textarea>
  </div>
</template>

<script>
// 引入全局实例
import _CodeMirror from "codemirror/lib/codemirror";

//代码样式
import "codemirror/addon/hint/sql-hint";
// 核心样式
import "codemirror/lib/codemirror.css";
// 引入主题后还需要在 options 中指定主题才会生效
// 需要引入具体的语法高亮库才会有对应的语法高亮效果, 目前已动态引入
import "codemirror/theme/darcula.css";
// 主题样式
import "codemirror/addon/hint/show-hint.css";

import {
  reactive,
  defineComponent,
  toRefs,
  getCurrentInstance,
  onMounted,
  watch,
  ref,
  onBeforeUnmount,
} from "vue";
import { format } from "sql-formatter";

// codemirror 官方其实支持通过 /addon/mode/loadmode.js 和 /mode/meta.js 来实现动态加载对应语法高亮库
// 但 vue 貌似没有无法在实例初始化后再动态加载对应 JS ，所以此处才把对应的 JS 提前引入
import "codemirror/mode/clike/clike.js";
import "codemirror/mode/r/r.js";

const codemirrorThemList = [];
const requireModules = require.context("codemirror/theme/", false, /\.css$/);
requireModules.keys().forEach((value) => {
  const newValue = value.replace(/^\.\//, "").replace(/\.css$/, "");
  codemirrorThemList.push(newValue);
});

// 尝试获取全局实例
const CodeMirror = window.CodeMirror || _CodeMirror;
let coder = null; // 编辑器实例

export default defineComponent({
  name: "codeEditor",
  props: {
    value: {
      type: String,
      default: "",
    },
    heightSize: {
      type: Number,
      default: 500,
    },
    scene: {
      type: String,
      default: "look", // add: 新增； edit: 编辑； look: 查看
    },
    eventType: {
      type: String,
      default: "blur", // 可用事件'change', 'blur'等等；具体参考codemirror文档
    },
    theme: {
      type: String,
      default: "darcula", // 编辑器主题色
    },
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const data = reactive({
      code: props.value, // 内部真实的内容
      // 默认配置
      options: {
        // mode: "text/x-java", // 不设置的话，默认使用第一个引用
        mode: "text/x-mariadb",
        // 缩进格式
        tabSize: 2,
        // 主题，对应主题库 JS 需要提前引入
        theme: props.theme,
        // 显示行号
        lineNumbers: true,
        readOnly:
          props.scene === "add" || props.scene === "edit" ? false : "nocursor", // true: 不可编辑  false: 可编辑 'nocursor' 失焦,不可编辑
      },
      // 初始化
      initialize: () => {
        // 初始化编辑器实例，传入需要被实例化的文本域对象和默认配置
        coder = CodeMirror.fromTextArea(proxy.$refs.textarea, data.options);
        const h = props.heightSize + "px";
        coder.setSize("auto", h);
        // 此处也可使用'change'事件，不过每次书写的过程中都会触发，为了提高性能，故默认使用'blur'
        coder.on(props.eventType, (coder) => {
          if (coder.getValue() != format(coder.getValue())) {
            coder.setValue(format(coder.getValue()));
          }
          emit("update:value", coder.getValue());
        });
      },
      // 动态引入语法高亮库
      importThemDynamic: () => {
        return new Promise((resolve) => {
          codemirrorThemList.forEach((value) => {
            if (props.theme === value) {
              import(`codemirror/theme/${props.theme}.css`);
              resolve();
            }
          });
        });
      },
    });
    onMounted(() => {
      // console.log('value:', props.value)
      data.importThemDynamic().then(() => {
        data.initialize();
      });
    });
    onBeforeUnmount(() => {
      coder.off(props.eventType);
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style>
.in-coder-panel {
  flex-grow: 1;
  display: flex;
  position: relative;
}

.in-coder-panel .CodeMirror {
  flex-grow: 1;
  text-align: left !important;
  z-index: 1;
}

.in-coder-panel .CodeMirror .CodeMirror-code {
  line-height: 20px;
}
</style>
