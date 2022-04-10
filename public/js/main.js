import { Ball } from "./Ball.js";

import { clearCanvas } from "./canvas.js";
import { Controller } from "./Controller.js";
import { Pocket } from "./Pocket.js";
import { setupBalls } from "./setupBalls.js";
import { setupPockets } from "./setupPockets.js";

const controller = new Controller();

setupPockets();
setupBalls();

function loop() {
    clearCanvas();
    Ball.updateAll();
    Pocket.drawAll();
    Ball.drawAll();
    controller.draw();
    controller.active = Ball.idle;
    requestAnimationFrame(loop);
}

loop();
