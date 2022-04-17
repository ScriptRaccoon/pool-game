import { canvas, ctx, margin } from "./canvas.js";
import { openDialog } from "./dialog.js";
import { Pocket } from "./Pocket.js";
import { Bumper } from "./Bumper.js";
import { blackBall, whiteBall } from "./setupBalls.js";
import { state } from "./state.js";
import {
    angleBetween,
    sub,
    distance,
    norm,
    rotate,
    scale,
    randomElement,
    dotProduct,
    add,
} from "./math.js";
import { SOUND } from "./sound.js";

export class Ball {
    static list = [];

    static updateAll() {
        if (!state.playing) return;
        Ball.list.forEach((b) => b.update());
        state.idle = Ball.list.every((b) => b.idle || b.inPocket);
        if (state.idle) {
            if (blackBall.inPocket) {
                Ball.finishGame();
            } else if (whiteBall.inPocket) {
                SOUND.WHIP.play();
                whiteBall.reset();
            }
        }
    }

    static finishGame() {
        state.won =
            !whiteBall.inPocket &&
            Ball.list.every(
                (ball) => ball == whiteBall || ball.inPocket
            );
        state.playing = false;
        if (state.won) {
            SOUND.WIN.play();
        } else {
            SOUND.LOSE.play();
        }
        openDialog();
    }

    static drawAll() {
        Ball.list.forEach((b) => b.draw());
    }

    static resetAll() {
        Ball.list.forEach((b) => b.reset());
    }

    constructor({ pos, color, vel }) {
        this.pos = pos;
        this.originalPos = { ...pos };
        this.vel = vel ?? { x: 0, y: 0 };
        this.originalVel = { ...this.vel };
        this.color = color;
        this.size = 18;
        this.friction = 0.99;
        this.inPocket = false;

        this.gradient = ctx.createRadialGradient(
            -0.4 * this.size,
            -0.4 * this.size,
            1,
            0,
            0,
            this.size
        );
        this.gradient.addColorStop(0, "rgba(255,255,255,0.25)");
        this.gradient.addColorStop(0.4, "rgba(255,255,255,0)");
        this.gradient.addColorStop(0.7, "rgba(0,0,0,0)");
        this.gradient.addColorStop(1, "rgba(0,0,0,0.3)");

        this.alpha = 1;

        Ball.list.push(this);
    }

    draw() {
        // pocket animation
        if (this.alpha == 0) return;
        if (this.inPocket) {
            this.alpha = Math.max(0, this.alpha - 0.2);
        }
        const shadowFactor = {
            x: ((this.pos.x - canvas.width / 2) / canvas.width) * 0.5,
            y: 0.15,
        };
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.translate(this.pos.x, this.pos.y);
        // ball shadow
        ctx.beginPath();
        ctx.arc(
            this.size * shadowFactor.x,
            this.size * shadowFactor.y,
            this.size,
            0,
            2 * Math.PI
        );
        ctx.fillStyle = "rgba(0,0,0,0.15)";
        ctx.fill();
        ctx.closePath();
        // regular ball
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        // light effects on ball
        ctx.fillStyle = this.gradient;
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }

    get idle() {
        return this.vel.x == 0 && this.vel.y == 0;
    }

    update() {
        if (this.idle) return;
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        this.vel.x *= this.friction;
        this.vel.y *= this.friction;
        if (this.inPocket) return;
        this.collideWithBalls();
        this.bounceOfWalls();
        this.bounceOffBumpers();
        this.handleTinyVelocity();
        this.checkPockets();
    }

    bounceOffBumpers() {
        Bumper.list.forEach((bumper) => {
            const segment = bumper.intersectionSegment(this);
            if (segment !== null) {
                // bouncing
                const [a, b] = segment;
                const vector = sub(b, a);
                const angle = angleBetween(this.vel, vector);
                this.vel = rotate(2 * angle, this.vel);
                // play sound
                SOUND.BUMPER.volume = Math.min(
                    1,
                    norm(this.vel) / 10
                );
                SOUND.BUMPER.play();
            }
        });
    }

    checkPockets() {
        Pocket.list.forEach((pocket) => {
            if (pocket.includes(this)) {
                this.inPocket = true;
                SOUND.POCKET.play();
                return;
            }
        });
    }

    handleTinyVelocity() {
        const threshold = 0.04;
        if (Math.abs(this.vel.x) < threshold) {
            this.vel.x = 0;
        }
        if (Math.abs(this.vel.y) < threshold) {
            this.vel.y = 0;
        }
    }

    intersects(ball) {
        return distance(this.pos, ball.pos) <= this.size + ball.size;
    }

    collideWithBalls() {
        Ball.list.forEach((ball) => {
            if (ball == this || ball.inPocket) return;
            const d = distance(this.pos, ball.pos);
            // check for collision
            if (d > this.size + ball.size) return;
            // pull balls apart when there is overlap
            const L = this.size + ball.size - d;
            const n = sub(ball.pos, this.pos);
            const c = scale(L / (2 * d), n);
            this.pos = sub(this.pos, c);
            ball.pos = add(ball.pos, c);
            // https://en.wikipedia.org/wiki/Elastic_collision
            const prod = dotProduct(sub(this.vel, ball.vel), n);
            const m = scale(prod / (d * d), n);
            this.vel = sub(this.vel, m);
            ball.vel = add(ball.vel, m);
            // play sound
            SOUND.COLLISION.volume = Math.min(
                (norm(this.vel) + norm(ball.vel)) / 15,
                1
            );
            SOUND.COLLISION.play();
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
        this.alpha = 1;
        this.pos = { ...this.originalPos };
        this.vel = { ...this.originalVel };
        if (this == whiteBall) {
            this.avoidOtherBalls();
        }
    }

    avoidOtherBalls() {
        const delta = 4;
        while (
            Ball.list.some(
                (ball) => ball != this && this.intersects(ball)
            )
        ) {
            const coord = randomElement(["x", "y"]);
            const sign = randomElement([+1, -1]);
            this.pos[coord] += sign * delta;
        }
    }
}
