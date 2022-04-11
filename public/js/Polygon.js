import { ctx } from "./canvas.js";
import { solveRealQuadratic } from "./utils.js";

export class Polygon {
    static list = [];

    static drawAll() {
        Polygon.list.forEach((p) => p.draw());
    }

    constructor(coords) {
        this.coords = coords;
        this.color = "rgb(0,90,15)";
        Polygon.list.push(this);
    }

    draw() {
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(this.coords[0].x, this.coords[0].y);
        for (let i = 1; i < this.coords.length; i++) {
            ctx.lineTo(this.coords[i].x, this.coords[i].y);
        }
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    intersectsWith(circle) {
        for (let i = 0; i < this.coords.length - 1; i++) {
            const c = circle.pos;
            const r = circle.size;
            const a = this.coords[i];
            const b = this.coords[i + 1];
            const u = Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2);
            const v =
                2 *
                ((a.x - c.x) * (b.x - a.x) +
                    (a.y - c.y) * (b.y - a.y));
            const w =
                Math.pow(a.x - c.x, 2) +
                Math.pow(a.y - c.y, 2) -
                Math.pow(r, 2);
            const solutions = solveRealQuadratic(u, v, w);
            if (
                solutions.length > 0 &&
                solutions.some((t) => t >= 0 && t <= 1)
            )
                return i;
        }
        return false;
    }
}
