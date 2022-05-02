import { canvas, ctx, margin } from "./canvas.js";
import {
    angleBetween,
    sub,
    distance,
    norm,
    rotate,
    scale,
    dotProduct,
    add,
} from "./math.js";
import { SOUND } from "./sound.js";

export class Ball {
    constructor({ pos, color, vel }) {
        this.pos = pos;
        this.originalPos = { ...pos };
        this.vel = vel ?? { x: 0, y: 0 };
        this.originalVel = { ...this.vel };
        this.color = color;
        this.size = 18;
        this.friction = 0.99;
        this.inPocket = false;
        // gradient for light effects
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
    }

    draw() {
        // pocket animation
        if (this.alpha == 0) return;
        if (this.inPocket) {
            this.alpha = Math.max(0, this.alpha - 0.2);
        }
        // prepare drawing
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.translate(this.pos.x, this.pos.y);

        // ball shadow
        const shadowOffset = {
            x: ((this.pos.x - canvas.width / 2) / canvas.width) * 0.5,
            y: 0.15,
        };
        ctx.beginPath();
        ctx.arc(
            this.size * shadowOffset.x,
            this.size * shadowOffset.y,
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

    update(game) {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        this.vel.x *= this.friction;
        this.vel.y *= this.friction;
        this.handleTinyVelocity();
        if (this.inPocket) return;
        this.bounceOfWalls();
        this.collideWithBalls(game.balls);
        this.bounceOffBumpers(game.bumpers);
        this.checkPockets(game.pockets);
    }

    bounceOfWalls() {
        // horizontal
        if (this.pos.x + this.size >= canvas.width - margin) {
            this.pos.x = canvas.width - this.size - margin;
            this.vel.x *= -1;
        } else if (this.pos.x - this.size <= margin) {
            this.pos.x = this.size + margin;
            this.vel.x *= -1;
        }
        // vertical
        if (this.pos.y + this.size >= canvas.height - margin) {
            this.pos.y = canvas.height - this.size - margin;
            this.vel.y *= -1;
        } else if (this.pos.y - this.size <= margin) {
            this.pos.y = this.size + margin;
            this.vel.y *= -1;
        }
    }

    collideWithBalls(balls) {
        balls.forEach((ball) => {
            if (ball == this || ball.inPocket) return;
            const dist = distance(this.pos, ball.pos);
            // check for collision
            if (dist > this.size + ball.size) return;
            // pull balls apart when there is overlap
            const L = this.size + ball.size - dist;
            const x_d = sub(ball.pos, this.pos);
            const c = scale(L / (2 * dist), x_d);
            this.pos = sub(this.pos, c);
            ball.pos = add(ball.pos, c);
            // elastic collision
            const v_d = sub(this.vel, ball.vel);
            const w = scale(
                (1 / Math.pow(dist, 2)) * dotProduct(x_d, v_d),
                x_d
            );
            this.vel = sub(this.vel, w);
            ball.vel = add(ball.vel, w);
            // play sound
            const volume = Math.min(
                (norm(this.vel) + norm(ball.vel)) / 15,
                1
            );
            SOUND.COLLISION.volume = volume;
            SOUND.COLLISION.play();
        });
    }

    bounceOffBumpers(bumpers) {
        bumpers.forEach((bumper) => {
            const segment = bumper.intersectionSegment(this);
            if (segment !== null) {
                // bouncing
                const [a, b] = segment;
                const vector = sub(b, a);
                const angle = angleBetween(this.vel, vector);
                this.vel = rotate(2 * angle, this.vel);
                // play sound
                const volume = Math.min(1, norm(this.vel) / 30);
                SOUND.BUMPER.volume = volume;
                SOUND.BUMPER.play();
            }
        });
    }

    checkPockets(pockets) {
        pockets.forEach((pocket) => {
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

    reset(game) {
        this.inPocket = false;
        this.alpha = 1;
        this.pos = { ...this.originalPos };
        this.vel = { ...this.originalVel };
        if (this == game.whiteBall) {
            this.avoidOtherBalls(game.balls);
        }
    }

    avoidOtherBalls(balls) {
        const delta = 4;
        while (
            balls.some(
                (ball) => ball != this && this.intersects(ball)
            )
        ) {
            const coord = Math.random() < 0.5 ? "x" : "y";
            const sign = Math.random() < 0.5 ? +1 : -1;
            this.pos[coord] += sign * delta;
        }
    }
}
