import { tctx } from "./canvas.js";
import { solveRealQuadratic } from "./utils.js";

export class Polygon {
    constructor({ coords }) {
        this.coords = coords;
    }

    draw() {
        tctx.beginPath();
        tctx.moveTo(this.coords[0].x, this.coords[0].y);
        for (let i = 1; i < this.coords.length; i++) {
            tctx.lineTo(this.coords[i].x, this.coords[i].y);
        }
        tctx.fill();
        tctx.closePath();
    }

    intersectionLineWith(circle) {
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
        return null;
    }
}
