import { ctx, canvas, canvasNorm } from "./canvas.js";
import { mouse } from "./mouse.js";
import { whiteBall } from "./setupBalls.js";
import { state } from "./state.js";
import { sub, scale, normalize, limit } from "./utils.js";

export class Controller {
    constructor() {
        this.maxLength = 300;
        this.vector = { x: 0, y: 0 };
        this.enableKlick();
    }

    get active() {
        return state.idle && state.playing;
    }

    enableKlick() {
        canvas.addEventListener("click", () => {
            if (!this.active) return;
            whiteBall.vel = scale(0.1, this.vector);
        });
    }

    draw() {
        if (!this.active) return;
        // thick line
        ctx.save();
        ctx.lineWidth = 10;
        ctx.lineCap = "round";
        ctx.strokeStyle = "rgba(255,255,255,0.5)";
        this.vector = limit(
            sub(mouse, whiteBall.pos),
            this.maxLength
        );
        ctx.translate(whiteBall.pos.x, whiteBall.pos.y);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(this.vector.x, this.vector.y);
        ctx.stroke();
        ctx.closePath();
        // thin line
        ctx.lineWidth = 1;
        const targetFar = scale(canvasNorm, normalize(this.vector));
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(targetFar.x, targetFar.y);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }
}
