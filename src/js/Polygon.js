import { tctx } from "./canvas.js";
import { segmentIntersectsCircle } from "./math.js";

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

    // gets the segment which intersects a circle
    intersectionSegment(circle) {
        for (let i = 0; i < this.coords.length - 1; i++) {
            const a = this.coords[i];
            const b = this.coords[i + 1];
            const c = circle.pos;
            const r = circle.size;
            if (segmentIntersectsCircle([a, b], [c, r])) {
                return [a, b];
            }
        }
        return null;
    }
}
