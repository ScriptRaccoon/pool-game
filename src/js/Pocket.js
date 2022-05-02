import { tctx } from "./canvas.js";
import { distance } from "./math.js";

export const pocketSize = 30;
export const cornerOffset = 12;

export class Pocket {
    constructor({ pos, type, rotation }) {
        this.pos = pos;
        this.type = type;
        this.rotation = rotation;
        this.size = pocketSize;
        this.gradient = tctx.createRadialGradient(
            0,
            0,
            0,
            0,
            0,
            this.size
        );
        this.gradient.addColorStop(0.4, "#202020");
        this.gradient.addColorStop(1, "#000");
    }

    draw() {
        tctx.save();
        tctx.shadowBlur = 10;
        tctx.shadowColor = "#000";
        tctx.translate(this.pos.x, this.pos.y);
        tctx.fillStyle = this.gradient;
        tctx.beginPath();
        tctx.arc(0, 0, this.size, 0, 2 * Math.PI);
        tctx.fill();
        tctx.closePath();
        tctx.restore();
    }

    includes(ball) {
        return distance(this.pos, ball.pos) < this.size;
    }

    drawMounting() {
        tctx.save();
        const width = 10;
        tctx.lineWidth = width;
        tctx.strokeStyle = "rgb(230,180,0)";
        tctx.lineCap = "round";
        tctx.shadowBlur = 10;
        tctx.shadowColor = "rgb(255,200,0,0.25)";
        tctx.translate(this.pos.x, this.pos.y);
        tctx.rotate((this.rotation * Math.PI) / 180);

        if (this.type === "corner") {
            const d = 0.16;
            const overflow = 60;
            tctx.beginPath();
            tctx.moveTo(
                -width / 2 - cornerOffset,
                this.size + overflow - cornerOffset
            );
            tctx.arc(
                0,
                0,
                this.size + width / 2,
                (0.5 + d) * Math.PI,
                (2 - d) * Math.PI
            );
            tctx.lineTo(
                this.size + overflow - cornerOffset,
                -width / 2 - cornerOffset
            );
            tctx.stroke();
            tctx.closePath();
        } else if (this.type === "edge") {
            const d = 0.04;
            const overflow = 50;
            tctx.beginPath();
            tctx.moveTo(-this.size - overflow, -width / 2);
            tctx.arc(
                0,
                0,
                this.size + width / 2,
                (1 + d) * Math.PI,
                (2 - d) * Math.PI
            );
            tctx.lineTo(this.size + overflow, -width / 2);
            tctx.stroke();
            tctx.closePath();
        }

        tctx.restore();
    }
}
