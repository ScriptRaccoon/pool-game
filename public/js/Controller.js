import { Ball } from "./Ball.js";
import { ctx, canvas } from "./canvas.js";
import { mousePos } from "./utils.js";

export class Controller {
    constructor() {
        this.mouse = { x: 0, y: 0 };
        this.active = false;
    }

    followMouse() {
        window.addEventListener("mousemove", (e) => {
            this.mouse = mousePos(e, canvas);
        });
    }

    draw() {
        if (!this.active) return;
        const whiteBallPos = Ball.whiteBall.pos;
        ctx.lineWidth = 8;
        ctx.strokeStyle = "rgba(255,250,100,0.5)";
        ctx.beginPath();
        ctx.moveTo(whiteBallPos.x, whiteBallPos.y);
        ctx.lineTo(this.mouse.x, this.mouse.y);
        ctx.stroke();
        ctx.closePath();
    }
}
