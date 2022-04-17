import { ctx, canvasNorm } from "./canvas.js";
import { mouse } from "./mouse.js";
import { SOUND } from "./sound.js";
import { sub, scale, normalize, limit, norm } from "./math.js";

export class Controller {
    constructor(game) {
        this.maxLength = 300;
        // not good practice. controller has a game,
        // and game has a controller
        this.game = game;
        this.vector = { x: 0, y: 0 };
        this.addControl();
    }

    get active() {
        return this.game.idle && this.game.playing;
    }

    addControl() {
        document.addEventListener("click", (e) => {
            if (!this.active || e.target.nodeName === "BUTTON")
                return;
            const factor = 0.15;
            this.game.whiteBall.vel = scale(factor, this.vector);
            const speed = norm(this.game.whiteBall.vel);
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
        const ball = this.game.whiteBall;
        // thick line
        ctx.save();
        ctx.lineWidth = 10;
        ctx.lineCap = "round";
        ctx.strokeStyle = "rgba(255,255,255,0.5)";
        this.vector = limit(sub(mouse, ball.pos), this.maxLength);
        ctx.translate(ball.pos.x, ball.pos.y);
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
