import { tctx } from "./canvas.js";
import { solveRealQuadratic } from "./utils.js";

export class Polygon {
    static list = [];

    static drawAll() {
        Polygon.list.forEach((p) => p.draw());
    }

    constructor({ coords, shadow }) {
        this.coords = coords;
        this.color = "rgb(0,90,15)";
        Polygon.list.push(this);
        this.shadow = shadow || { x: 0, y: 0 };
    }

    draw() {
        tctx.filter = "blur(3px)";
        tctx.beginPath();
        tctx.fillStyle = "rgba(0,0,0,0.45)";
        tctx.moveTo(
            this.coords[0].x + this.shadow.x,
            this.coords[0].y + this.shadow.y
        );
        for (let i = 1; i < this.coords.length; i++) {
            tctx.lineTo(
                this.coords[i].x + this.shadow.x,
                this.coords[i].y + this.shadow.y
            );
        }
        tctx.fill();
        tctx.closePath();
        tctx.filter = "blur(0px)";

        tctx.beginPath();
        tctx.fillStyle = this.color;
        tctx.moveTo(this.coords[0].x, this.coords[0].y);
        for (let i = 1; i < this.coords.length; i++) {
            tctx.lineTo(this.coords[i].x, this.coords[i].y);
        }

        tctx.fill();
        tctx.closePath();
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
