import { Ball } from "./Ball.js";
import { clearCanvas } from "./canvas.js";

import { Controller } from "./Controller.js";
import { Pocket } from "./Pocket.js";
import { setupBalls } from "./setupBalls.js";
import { setupPockets } from "./setupPockets.js";
import { dialogElement, state } from "./state.js";
import { drawTable } from "./table.js";

const controller = new Controller();

setupPockets();
setupBalls();

Pocket.drawAll();
Ball.drawAll();

function loop() {
    clearCanvas();
    drawTable();
    Ball.updateAll();
    Pocket.drawAll();
    Ball.drawAll();
    controller.active = Ball.idle && state.playing;
    controller.draw();
    requestAnimationFrame(loop);
}

loop();

function init() {
    restartBtn.addEventListener("click", () => {
        Ball.resetAll();
        dialogElement.open = false;
        state.playing = true;
    });
}

init();
