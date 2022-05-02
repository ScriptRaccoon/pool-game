import { tctx } from "./canvas.js";
import { Polygon } from "./Polygon.js";

export class Bumper extends Polygon {
    constructor({ coords, shadowOffset }) {
        super({ coords });
        this.color = "rgb(0,90,15)";
        this.shadowOffset = shadowOffset || { x: 0, y: 0 };
        this.shadowColor = "rgba(0,0,0,0.45)";
    }

    draw() {
        // draw shadow
        tctx.filter = "blur(3px)";
        tctx.beginPath();
        tctx.fillStyle = this.shadowColor;
        tctx.moveTo(
            this.coords[0].x + this.shadowOffset.x,
            this.coords[0].y + this.shadowOffset.y
        );
        for (let i = 1; i < this.coords.length; i++) {
            tctx.lineTo(
                this.coords[i].x + this.shadowOffset.x,
                this.coords[i].y + this.shadowOffset.y
            );
        }
        tctx.fill();
        tctx.closePath();
        tctx.filter = "blur(0px)";
        // draw shape
        super.draw();
    }
}
