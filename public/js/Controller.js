import { whiteBall } from "./setupBalls.js";
import { ctx, canvas } from "./canvas.js";
import { mousePos } from "./utils.js";

export class Controller {
    constructor() {
        this.mouse = { x: 0, y: 0 };
        this.active = false;
        this.followMouse();
        this.enableKlick();
    }

    enableKlick() {
        canvas.addEventListener("click", () => {
            if (!this.active) return;
            const factor = 0.1;
            whiteBall.vel.x =
                factor * (this.mouse.x - whiteBall.pos.x);
            whiteBall.vel.y =
                factor * (this.mouse.y - whiteBall.pos.y);
            this.active = false;
        });
    }

    followMouse() {
        window.addEventListener("mousemove", (e) => {
            if (!this.active) return;
            this.mouse = mousePos(e, canvas);
        });
    }

    draw() {
        if (!this.active) return;
        ctx.lineWidth = 8;
        ctx.strokeStyle = "rgba(255,250,100,0.5)";
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(whiteBall.pos.x, whiteBall.pos.y);
        ctx.lineTo(this.mouse.x, this.mouse.y);
        ctx.stroke();
        ctx.closePath();
    }
}
