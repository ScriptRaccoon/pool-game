import { ctx, canvasNorm } from "./canvas.js";
import { mouse } from "./mouse.js";
import { SOUND } from "./sound.js";
import { sub, scale, normalize, limit, norm } from "./math.js";

export class Controller {
    constructor(ball) {
        this.ball = ball;
        this.vector = { x: 0, y: 0 };
        this.addControl();
        this.active = true;
        this.maxLength = 300;
    }

    addControl() {
        document.addEventListener("click", (e) => {
            if (!this.active || e.target.nodeName === "BUTTON")
                return;
            this.active = false;
            const factor = 0.15;
            this.ball.vel = scale(factor, this.vector);
            const speed = norm(this.ball.vel);
            const volume = Math.min(
                1,
                speed / (factor * this.maxLength)
            );
            SOUND.CUE.volume = volume;
            SOUND.CUE.play();
        });
    }

    update() {
        this.vector = limit(
            this.maxLength,
            sub(mouse, this.ball.pos)
        );
    }

    draw() {
        if (!this.active) return;
        // thick line
        ctx.save();
        ctx.lineWidth = 10;
        ctx.lineCap = "round";
        ctx.strokeStyle = "rgba(255,255,255,0.5)";
        ctx.translate(this.ball.pos.x, this.ball.pos.y);
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
