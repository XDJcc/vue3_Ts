import { App, Component } from "vue";
import {
  Check,
  Menu,
  HomeFilled,
  Document,
  SetUp,
  Edit,
  Setting,
  Lollipop,
  Link,
  Position,
  Histogram,
  RefreshRight,
  ArrowDown,
  Close,
  CloseBold,
  BellFilled,
  ArrowRightBold,
  ArrowLeftBold,
  Briefcase,
  Chicken,
  VideoPlay,
  VideoPause,
  Headset,
} from "@element-plus/icons";

const components = [
  // icon
  Check,
  Headset,
  Menu,
  Document,
  HomeFilled,
  SetUp,
  Edit,
  Setting,
  Lollipop,
  Link,
  Position,
  Histogram,
  RefreshRight,
  ArrowDown,
  ArrowRightBold,
  ArrowLeftBold,
  Close,
  CloseBold,
  BellFilled,
  Briefcase,
  Chicken,
  VideoPlay,
  VideoPause,
];

export function useElementPlus(app: App): void {
  components.forEach((component: Component) => {
    app.component(component.name, component);
  });
}
