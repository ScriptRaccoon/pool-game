import { Ball } from "./Ball.js";

import { clearCanvas } from "./canvas.js";
import { Controller } from "./Controller.js";
import { setupBalls } from "./setupBalls.js";

const myController = new Controller();

setupBalls();

myController.followMouse();

function loop() {
    clearCanvas();
    Ball.list.forEach((b) => b.update());
    Ball.list.forEach((b) => b.draw());
    myController.draw();
    requestAnimationFrame(loop);
}

loop();
