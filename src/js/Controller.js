import { ctx, canvas, canvasNorm } from "./canvas.js";
import { mouse } from "./mouse.js";
import { whiteBall } from "./setupBalls.js";
import { state } from "./state.js";
import { sub, scale, normalize, limit } from "./utils.js";

export class Controller {
    constructor() {
        this.maxLength = 200;
        this.enableKlick();
    }

    get active() {
        return state.idle && state.playing;
    }

    enableKlick() {
        canvas.addEventListener("click", () => {
            if (!this.active) return;
            const factor = 0.1;
            whiteBall.vel = {
                x: factor * (mouse.x - whiteBall.pos.x),
                y: factor * (mouse.y - whiteBall.pos.y),
            };
        });
    }

    draw() {
        if (!this.active) return;
        ctx.save();
        ctx.lineCap = "round";
        ctx.lineWidth = 10;
        ctx.strokeStyle = "rgba(255,255,255,0.5)";
        const target = limit(
            sub(mouse, whiteBall.pos),
            this.maxLength
        );
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
