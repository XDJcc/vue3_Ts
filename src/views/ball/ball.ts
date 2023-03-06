import {ref} from "vue";

export const random = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export const randomColor = function () {
    return 'rgb(' +
        random(0, 255) + ', ' +
        random(0, 255) + ', ' +
        random(0, 255) + ')';
}
export default class Ball {
    x: number
    y: number
    velX: number
    velY: number
    color
    size
    ctx: CanvasRenderingContext2D
    width
    height

    constructor(x, y, velX, velY, color, size, ctx, width, height) {
        this.x = x
        this.y = y
        this.velX = velX
        this.velY = velY
        this.color = color
        this.size = size
        this.ctx = ctx
        this.width = width
        this.height = height
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    update() {
        if ((this.x + this.size) >= this.width) {
            this.velX = -(this.velX);
        }

        if ((this.x - this.size) <= 0) {
            this.velX = -(this.velX);
        }

        if ((this.y + this.size) >= this.height) {
            this.velY = -(this.velY);
        }

        if ((this.y - this.size) <= 0) {
            this.velY = -(this.velY);
        }

        this.x += this.velX;
        this.y += this.velY;
    }

}



