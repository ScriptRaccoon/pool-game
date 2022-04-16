import { tctx } from "./canvas.js";
import { Polygon } from "./Polygon.js";

export class Bumper extends Polygon {
    static list = [];

    static drawAll() {
        Bumper.list.forEach((p) => p.draw());
    }

    constructor({ coords, shadow }) {
        super({ coords });
        this.shadow = shadow || { x: 0, y: 0 };
        this.color = "rgb(0,90,15)";
        this.shadowColor = "rgba(0,0,0,0.45)";
        Bumper.list.push(this);
    }

    draw() {
        // draw shadow
        tctx.filter = "blur(3px)";
        tctx.beginPath();
        tctx.fillStyle = this.shadowColor;
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
        // draw shape
        tctx.beginPath();
        tctx.fillStyle = this.color;
        tctx.moveTo(this.coords[0].x, this.coords[0].y);
        for (let i = 1; i < this.coords.length; i++) {
            tctx.lineTo(this.coords[i].x, this.coords[i].y);
        }
        tctx.fill();
        tctx.closePath();
    }
}
