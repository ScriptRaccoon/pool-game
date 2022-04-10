import { Ball } from "./Ball.js";

import { clearCanvas } from "./canvas.js";
import { Controller } from "./Controller.js";
import { setupBalls } from "./setupBalls.js";

const controller = new Controller();

setupBalls();

function loop() {
    clearCanvas();
    Ball.updateAll();
    Ball.drawAll();
    controller.draw();
    controller.active = Ball.idle;
    requestAnimationFrame(loop);
}

loop();
