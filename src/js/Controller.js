import { ctx, canvas, canvasNorm } from "./canvas.js";
import { mouse } from "./mouse.js";
import { whiteBall } from "./setupBalls.js";
import { SOUND } from "./sound.js";
import { state } from "./state.js";
import { sub, scale, normalize, limit, norm } from "./math.js";

export class Controller {
    constructor() {
        this.maxLength = 300;
        this.vector = { x: 0, y: 0 };
        this.addControl();
    }

    get active() {
        return state.idle && state.playing;
    }

    addControl() {
        document.addEventListener("click", (e) => {
            if (!this.active || e.target.nodeName === "BUTTON")
                return;
            const factor = 0.15;
            whiteBall.vel = scale(factor, this.vector);
            const speed = norm(whiteBall.vel);
            const volume = Math.min(
                1,
                speed / (factor * this.maxLength)
            );
            SOUND.CUE.volume = volume;
            SOUND.CUE.play();
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
