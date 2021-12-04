//食物构造器
import { ElMessage } from "element-plus";

class Foot {
  element: HTMLElement;

  constructor() {
    this.element = document.getElementById("foot");
    this.change();
  }

  get x(): number {
    return this.element.offsetLeft;
  }

  get y(): number {
    return this.element.offsetTop;
  }

  change() {
    const left: number = Math.round(Math.random() * 29) * 10;
    const top: number = Math.round(Math.random() * 29) * 10;
    this.element.style.left = left + "px";
    this.element.style.top = top + "px";
  }
}

/*计分板*/
class ScorePanel {
  score = 0;
  level = 1;
  scoreEle: HTMLElement;
  levelEle: HTMLElement;

  maxLevel: number;
  upScore: number;

  constructor(maxLevel = 10, upScore = 10) {
    this.scoreEle = document.getElementById("scoreEle");
    this.levelEle = document.getElementById("levelEle");
    this.maxLevel = maxLevel;
    this.upScore = upScore;
  }

  //加分
  addSore() {
    this.scoreEle.innerHTML = "Score:" + ++this.score + "";
    if (this.score % this.upScore === 0) this.levelUp();
  }

  //升级
  levelUp() {
    if (this.level > this.maxLevel) return;
    this.levelEle.innerHTML = "Level:" + ++this.level + "";
  }
}

/*
 *  蛇
 * */
class Snake {
  head: HTMLElement;
  bodies: HTMLCollection;
  element: HTMLElement;

  constructor() {
    this.element = document.getElementById("snake");
    this.head = this.element.querySelector("div");
    this.bodies = this.element.getElementsByTagName("div");
  }

  get x() {
    return this.head.offsetLeft;
  }

  set x(value: number) {
    if (this.x == value) return;
    //限制范围
    if (value < 0 || value > 300) {
      throw new Error("撞墙！");
    }
    if (
      this.bodies[1] &&
      (this.bodies[1] as HTMLElement).offsetLeft === value
    ) {
      if (value > this.x) this.x -= value - this.x;
      else this.x += this.x - value;
    }
    //移动身体
    this.moveBody();
    this.head.style.left = value + "px";
    this.checkHeadBody();
  }

  get y() {
    return this.head.offsetTop;
  }

  set y(value: number) {
    if (this.y == value) return;
    if (value < 0 || value > 300) {
      throw new Error("撞墙！");
    }
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
      if (value > this.y) this.y -= value - this.y;
      else this.y += this.y - value;
    }
    this.moveBody();
    this.head.style.top = value + "px";
    this.checkHeadBody();
  }

  //吃到食物
  addBody() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore.
    this.element.insertAdjacentHTML("beforeend", "<div></div>");
    const len = this.element.getElementsByTagName("div");
    for (let i = 0; i < len.length - 1; i++) {
      len[i].setAttribute("class", "xx");
    }
  }

  //移动身体  把前面一个位置 赋值给 后面的一个元素
  moveBody() {
    for (let i = this.bodies.length - 1; i > 0; i--) {
      const x = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      const y = (this.bodies[i - 1] as HTMLElement).offsetTop;
      (this.bodies[i] as HTMLElement).style.left = x + "px";
      (this.bodies[i] as HTMLElement).style.top = y + "px";
    }
  }

  //是否撞到身体
  checkHeadBody() {
    for (let i = 1; i < this.bodies.length; i++) {
      const bd = this.bodies[i] as HTMLElement;
      if (this.x === bd.offsetLeft && this.y === bd.offsetTop) {
        throw new Error("撞到自己");
      }
    }
  }
}

/*游戏控制器*/
export default class GameControl {
  snake: Snake;
  foot: Foot;
  scorePanel: ScorePanel;
  direction = "";
  isLive = true;

  constructor() {
    this.snake = new Snake();
    this.foot = new Foot();
    this.scorePanel = new ScorePanel(100, 1);
    this.init();
  }

  //初始化游戏
  private init() {
    document.addEventListener("keydown", this.keyDownHandler);
    this.run();
  }

  keyDownHandler = (event: KeyboardEvent): void => {
    this.direction = event.key;
  };

  //开始移动 的方向
  run(): void {
    let x = this.snake.x;
    let y = this.snake.y;

    switch (this.direction) {
      case "ArrowUp":
      case "Up":
        y -= 10;
        break;
      case "ArrowDown":
      case "Down":
        y += 10;
        break;
      case "ArrowLeft":
      case "Left":
        x -= 10;
        break;
      case "ArrowRight":
      case "Right":
        x += 10;
        break;
    }

    //吃到食物  分数增加  蛇增加
    this.checkEat(x, y);

    try {
      this.snake.x = x;
      this.snake.y = y;
    } catch (err) {
      ElMessage.error(err.message + "GOME OVER");
      this.isLive = false;
    }
    this.isLive &&
    setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
  }

  //  是否吃到食物
  checkEat(x: number, y: number): void {
    if (x === this.foot.x && y === this.foot.y) {
      this.foot.change();
      this.scorePanel.addSore();
      this.snake.addBody();
    }
  }
}
