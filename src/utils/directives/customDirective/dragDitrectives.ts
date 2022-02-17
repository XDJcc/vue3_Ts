import type { App } from "vue";

/**
 * 自定义拖动指令
 * @description  使用方式：v-drag="[dragDom,dragHeader]"，如 `<div v-drag="['.drag-container .el-dialog', '.drag-container .el-dialog__header']"></div>`
 * @description dragDom 要拖动的元素，dragHeader 点击拖动的位置
 * @link 注意：https://github.com/element-plus/element-plus/issues/522
 * @lick 参考：https://blog.csdn.net/weixin_46391323/article/details/105228020?utm_medium=distribute.pc_relevant.none-task-blog-baidujs_title-10&spm=1001.2101.3001.4242
 */

export function dragDitrectives(vue: App) {
  vue.directive("drag", {
    mounted(el, binding) {
      if (!binding.value) return false;
      const dragDom = document.querySelector(binding.value[0]) as HTMLElement;
      const dragHeader = document.querySelector(
        binding.value[1]
      ) as HTMLElement;
      //绑定按下事件 改变鼠标的箭头的样式
      dragHeader.onmouseover = () => (dragHeader.style.cursor = `move`);

      function down(e: any, type: string) {
        //  鼠标按下 计算当前元素距离可视区域的距离

        const disX =
          type === "pc"
            ? e.clientX - dragHeader.offsetLeft
            : e.touches[0].clientX - dragHeader.offsetLeft;
        const disY =
          type === "pc"
            ? e.clientY - dragHeader.offsetTop
            : e.touches[0].clientY - dragHeader.offsetTop;

        //  获取  body 当前宽度  可是区域的高度（body的高度，特殊情况无法获取）  不获取body 的边框
        const screenWidth = document.body.clientWidth;
        const screenHeight = document.documentElement.clientHeight;

        //  获取 移动元素的 宽高  加上元素的变宽大小
        const dragDomWidth = dragDom.clientWidth;
        const dragDomHeight = dragDom.clientHeight;

        //  获取 移动元素  横向  移动范围   相对点 右侧边
        const minDragDomLeft = dragDom.offsetLeft; // 最左侧 元素宽
        const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth; //最右侧

        //  获取 移动元素 纵向 移动范围   相对点 下侧边
        const minDragDomTop = dragDom.offsetTop; //最顶部  元素高
        const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomHeight;

        // 获取到的值带px 正则匹配替换
        /*
         * getComputedStyle 不兼容全部 ie版本
         * 获取元素重绘、回流后的最终的样式
         * */
        let styL: any = getComputedStyle(dragDom).left;
        let styT: any = getComputedStyle(dragDom).top;

        // 注意在ie中  第一次获取到的值  为  组件自带50%移动之后   赋值为px
        if (styL.includes("%")) {
          styL = +document.body.clientWidth * (+styL.replace(/%/g, "") / 100);
          styT = +document.body.clientHeight * (+styT.replace(/%/g, "") / 100);
        } else {
          styL = +styL.replace(/px/g, "");
          styT = +styT.replace(/px/g, "");
        }

        return {
          disX,
          disY,
          minDragDomLeft,
          maxDragDomLeft,
          minDragDomTop,
          maxDragDomTop,
          styL,
          styT,
        };
      }

      function move(e: any, type: string, obj: any) {
        const {
          disX,
          disY,
          maxDragDomTop,
          minDragDomTop,
          maxDragDomLeft,
          minDragDomLeft,
          styL,
          styT,
        } = obj;
        // 通过事件委托，计算移动的距离
        let left =
          type === "pc" ? e.clientX - disX : e.touches[0].clientX - disX;
        let top =
          type === "pc" ? e.clientY - disY : e.touches[0].clientY - disY;

        // 边界处理
        if (-left > minDragDomLeft) {
          left = -minDragDomLeft;
        } else if (left > maxDragDomLeft) {
          left = maxDragDomLeft;
        }

        if (-top > minDragDomTop) {
          top = -minDragDomTop;
        } else if (top > maxDragDomTop) {
          top = maxDragDomTop;
        }
        // 移动当前元素
        dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`;
      }

      /**
       * pc端
       * onmousedown 鼠标按下触发事件
       * onmousemove 鼠标按下时持续触发事件
       * onmouseup 鼠标抬起触发事件
       */
      dragHeader.onmousedown = (e) => {
        const obj = down(e, "pc");
        document.onmousemove = (e) => {
          move(e, "pc", obj);
        };
        document.onmouseup = () => {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      };

      /**
       * 移动端
       * ontouchstart 当按下手指时，触发ontouchstart
       * ontouchmove 当移动手指时，触发ontouchmove
       * ontouchend 当移走手指时，触发ontouchend
       */
      dragHeader.ontouchstart = (e) => {
        const obj = down(e, "app");
        document.ontouchmove = (e) => {
          move(e, "app", obj);
        };
        document.ontouchend = () => {
          document.ontouchmove = null;
          document.ontouchend = null;
        };
      };
    },
  });
}
