import type { App } from "vue";
import { dragDitrectives } from "./customDirective/dragDitrectives";

export function directive(vue: App) {
  dragDitrectives(vue);
}
