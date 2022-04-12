import { Ball, whiteBall } from "./Ball.js";
import { ctx, canvas, canvasNorm } from "./canvas.js";
import { mouse } from "./mouse.js";
import { state } from "./state.js";
import { sub, scale, normalize } from "./utils.js";

export class Controller {
    constructor() {
        this.active = false;
        this.enableKlick();
    }

    enableKlick() {
        canvas.addEventListener("click", () => {
            if (!this.active) return;
            const factor = 0.1;
            whiteBall.vel.x = factor * (mouse.x - whiteBall.pos.x);
            whiteBall.vel.y = factor * (mouse.y - whiteBall.pos.y);
        });
    }

    update() {
        this.active = Ball.idle && state.playing;
    }

    draw() {
        if (!this.active) return;
        ctx.save();
        ctx.lineCap = "round";
        ctx.lineWidth = 10;
        ctx.strokeStyle = "rgba(255,255,255,0.5)";
        const target = sub(mouse, whiteBall.pos);
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
