import { canvas, ctx, margin } from "./canvas.js";
import { Pocket } from "./Pocket.js";
import { Polygon } from "./Polygon.js";
import { endMessage, state, writeStatus } from "./state.js";
import {
    angleBetween,
    sub,
    distance,
    norm,
    rotate,
} from "./utils.js";

export class Ball {
    static list = [];
    static idle = true;

    static updateAll() {
        Ball.list.forEach((b) => b.update());
        Ball.idle = Ball.list.every((b) => b.idle);
        if (Ball.idle && whiteBall.inPocket) {
            whiteBall.reset();
        }
    }

    static drawAll() {
        Ball.list.forEach((b) => b.draw());
    }

    static resetAll() {
        Ball.list.forEach((b) => b.reset());
    }

    constructor({ pos, color, vel, isBlack }) {
        this.pos = pos;
        this.originalPos = { ...pos };
        this.vel = vel ?? { x: 0, y: 0 };
        this.originalVel = { ...this.vel };
        this.isBlack = isBlack ?? false;
        this.color = color;
        this.size = 18;
        this.friction = 0.99;
        this.debugSpeed = 1;

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

        this.inPocket = false;

        Ball.list.push(this);
    }

    draw() {
        if (this.inPocket) return;
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

    get idle() {
        return this.vel.x == 0 && this.vel.y == 0;
    }

    update() {
        if (this.idle || this.inPocket) return;
        this.pos.x += this.debugSpeed * this.vel.x;
        this.pos.y += this.debugSpeed * this.vel.y;
        this.vel.x *= this.friction;
        this.vel.y *= this.friction;
        this.pushBalls();
        this.bounceOfWalls();
        this.bounceOffPolygons();
        this.handleTinyVelocity();
        this.checkPockets();
    }

    bounceOffPolygons() {
        Polygon.list.forEach((polygon) => {
            const i = polygon.intersectsWith(this);
            if (i !== false) {
                const start = polygon.coords[i];
                const end = polygon.coords[i + 1];
                const vector = sub(end, start);
                const angle = angleBetween(this.vel, vector);
                const newVel = rotate(2 * angle, this.vel);
                this.vel = newVel;
            }
        });
    }

    checkPockets() {
        Pocket.list.forEach((pocket) => {
            if (pocket.includes(this)) {
                this.inPocket = true;
                this.vel.x = 0;
                this.vel.y = 0;
                if (this.isBlack) {
                    state.won = Ball.list.every(
                        (ball) =>
                            ball == whiteBall ||
                            ball == this ||
                            ball.inPocket
                    );
                    state.playing = false;
                    writeStatus(endMessage());
                }
                return;
            }
        });
    }

    handleTinyVelocity() {
        const tiny = 0.04;
        if (Math.abs(this.vel.x) < tiny) {
            this.vel.x = 0;
        }
        if (Math.abs(this.vel.y) < tiny) {
            this.vel.y = 0;
        }
    }

    intersects(ball) {
        return distance(this.pos, ball.pos) <= this.size + ball.size;
    }

    pushBalls() {
        Ball.list.forEach((ball) => {
            if (ball == this || ball.inPocket) return;
            if (this.intersects(ball)) {
                const factor = 0.008 * norm(this.vel);
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
        if (this.pos.x + this.size >= canvas.width - margin) {
            this.pos.x = canvas.width - this.size - margin;
            this.vel.x *= -bounceFriction;
        } else if (this.pos.x - this.size <= margin) {
            this.pos.x = this.size + margin;
            this.vel.x *= -bounceFriction;
        }
        // vertical
        if (this.pos.y + this.size >= canvas.height - margin) {
            this.pos.y = canvas.height - this.size - margin;
            this.vel.y *= -bounceFriction;
        } else if (this.pos.y - this.size <= margin) {
            this.pos.y = this.size + margin;
            this.vel.y *= -bounceFriction;
        }
    }

    reset() {
        this.inPocket = false;
        this.pos = { ...this.originalPos };
        this.vel = { ...this.originalVel };
    }
}

export const whiteBall = new Ball({
    pos: { x: 200, y: 300 + margin },
    color: "white",
});
