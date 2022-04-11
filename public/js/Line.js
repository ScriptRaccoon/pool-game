import { ctx } from "./canvas.js";
import { solveRealQuadratic } from "./utils.js";

export class Line {
    static list = [];
    constructor({ start, end }) {
        this.start = start;
        this.end = end;
        Line.list.push(this);
    }

    // only for debugging
    draw() {
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.start.x, this.start.y);
        ctx.lineTo(this.end.x, this.end.y);
        ctx.stroke();
        ctx.closePath();
    }

    intersectsWith(circle) {
        const c = circle.pos;
        const r = circle.size;
        const a = this.start;
        const b = this.end;
        const u = Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2);
        const v =
            2 *
            ((a.x - c.x) * (b.x - a.x) + (a.y - c.y) * (b.y - a.y));
        const w =
            Math.pow(a.x - c.x, 2) +
            Math.pow(a.y - c.y, 2) -
            Math.pow(r, 2);
        const solutions = solveRealQuadratic(u, v, w);
        return (
            solutions.length > 0 &&
            solutions.some((t) => t >= 0 && t <= 1)
        );
    }
}
