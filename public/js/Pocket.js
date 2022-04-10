import { ctx, pocketSize } from "./canvas.js";
import { distance } from "./utils.js";

export class Pocket {
    static list = [];

    static drawAll() {
        Pocket.list.forEach((pocket) => pocket.draw());
    }

    constructor({ pos }) {
        this.pos = pos;
        this.size = pocketSize;
        Pocket.list.push(this);
    }

    draw() {
        ctx.fillStyle = "#000";
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }

    includes(ball) {
        return distance(this.pos, ball.pos) < this.size;
    }
}
