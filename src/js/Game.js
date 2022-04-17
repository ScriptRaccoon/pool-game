import { Controller } from "./Controller.js";
import { openDialog, closeDialog } from "./dialog.js";
import { COLORS } from "./setupBalls.js";
import { SOUND } from "./sound.js";

export class Game {
    constructor({ balls, bumpers, pockets }) {
        this.won = null;
        this.playing = true;
        this.idle = true;
        this.balls = balls;
        this.bumpers = bumpers;
        this.pockets = pockets;
        this.whiteBall = balls.find((b) => b.color == COLORS.WHITE);
        this.blackBall = balls.find((b) => b.color == COLORS.BLACK);
        this.controller = new Controller(this);
        document
            .getElementById("restartBtn")
            .addEventListener("click", () => this.restart());
    }

    draw() {
        this.balls.forEach((b) => b.draw());
        this.controller.draw();
    }

    update() {
        if (!this.playing) return;
        this.balls.forEach((b) => b.update(this));
        this.idle = this.balls.every((b) => b.idle || b.inPocket);
        if (this.idle) {
            if (this.blackBall.inPocket) {
                this.finish();
            } else if (this.whiteBall.inPocket) {
                SOUND.WHIP.play();
                this.whiteBall.reset(this);
            }
        }
    }

    finish() {
        this.playing = false;
        this.won =
            !this.whiteBall.inPocket &&
            this.balls.every(
                (ball) => ball == this.whiteBall || ball.inPocket
            );
        if (this.won) {
            SOUND.WIN.play();
            openDialog("You won!");
        } else {
            SOUND.LOSE.play();
            openDialog("You lost!");
        }
    }

    restart() {
        SOUND.WHIP.play();
        this.balls.forEach((b) => b.reset(this));
        closeDialog();
        this.won = null;
        this.playing = true;
    }
}
