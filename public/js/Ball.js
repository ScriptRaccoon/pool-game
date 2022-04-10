import { canvas, ctx } from "./canvas.js";
import { distance, norm } from "./utils.js";

export class Ball {
    static list = [];

    constructor({ pos, vel, color }) {
        this.pos = pos;
        this.vel = vel;
        this.color = color;
        this.size = 18;
        this.friction = 0.99;
        this.minVel = 0.04;

        this.gradient = ctx.createRadialGradient(
            -0.35 * this.size,
            -0.35 * this.size,
            1,
            0,
            0,
            this.size
        );

        this.gradient.addColorStop(0, "rgba(255,255,255,0.35)");
        this.gradient.addColorStop(1, "transparent");

        Ball.list.push(this);
    }

    draw() {
        ctx.save();
        ctx.translate(this.pos.x, this.pos.y);
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.fillStyle = this.gradient;
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }

    update() {
        if (this.vel.x == 0 && this.vel.y == 0) return;
        console.log("update...");
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        this.vel.x *= this.friction;
        this.vel.y *= this.friction;

        if (Math.abs(this.vel.x) < this.minVel) {
            this.vel.x = 0;
        }

        if (Math.abs(this.vel.y) < this.minVel) {
            this.vel.y = 0;
        }

        this.pushBalls();

        this.bounceOfWalls();
    }

    pushBalls() {
        Ball.list.forEach((ball) => {
            if (ball == this) {
                return;
            }
            if (
                distance(this.pos, ball.pos) <=
                this.size + ball.size
            ) {
                const factor = 0.015 * norm(this.vel);
                ball.vel.x += factor * (ball.pos.x - this.pos.x);
                ball.vel.y += factor * (ball.pos.y - this.pos.y);

                const factor2 = 0.004 * norm(this.vel);
                this.vel.x += factor2 * (this.pos.x - ball.pos.x);
                this.vel.y += factor2 * (this.pos.y - ball.pos.y);
            }
        });
    }

    bounceOfWalls() {
        const bounceFriction = 0.8;
        // horizontal
        if (this.pos.x + this.size >= canvas.width) {
            this.pos.x = canvas.width - this.size;
            this.vel.x *= -bounceFriction;
        } else if (this.pos.x - this.size <= 0) {
            this.pos.x = this.size;
            this.vel.x *= -bounceFriction;
        }
        // vertical
        if (this.pos.y + this.size >= canvas.height) {
            this.pos.y = canvas.height - this.size;
            this.vel.y *= -bounceFriction;
        } else if (this.pos.y - this.size <= 0) {
            this.pos.y = this.size;
            this.vel.y *= -bounceFriction;
        }
    }
}
