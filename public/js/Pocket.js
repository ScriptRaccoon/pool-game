import { ctx } from "./canvas.js";
import { pocketSize } from "./setupPolygons.js";
import { distance } from "./utils.js";

export class Pocket {
    static list = [];

    static drawAll() {
        Pocket.list.forEach((pocket) => pocket.draw());
    }

    constructor({ pos }) {
        this.pos = pos;
        this.size = pocketSize;
        this.gradient = ctx.createRadialGradient(
            this.pos.x,
            this.pos.y,
            0,
            this.pos.x,
            this.pos.y,
            this.size
        );
        this.gradient.addColorStop(0.5, "#151515");
        this.gradient.addColorStop(1, "#000");
        Pocket.list.push(this);
    }

    draw() {
        ctx.fillStyle = this.gradient;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }

    includes(ball) {
        return distance(this.pos, ball.pos) < this.size;
    }
}
