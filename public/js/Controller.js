import { whiteBall } from "./Ball.js";
import { ctx, canvas, canvasNorm } from "./canvas.js";
import { mousePos, sub, scale, normalize } from "./utils.js";

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
        ctx.save();
        ctx.lineCap = "round";
        ctx.lineWidth = 10;
        ctx.strokeStyle = "rgba(255,255,255,0.5)";
        const target = sub(this.mouse, whiteBall.pos);
        ctx.translate(whiteBall.pos.x, whiteBall.pos.y);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(target.x, target.y);
        ctx.stroke();
        ctx.closePath();
        const targetFar = scale(canvasNorm, normalize(target));
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(targetFar.x, targetFar.y);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }
}
