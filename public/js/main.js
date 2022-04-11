import { Ball } from "./Ball.js";
import { clearCanvas } from "./canvas.js";
import { Controller } from "./Controller.js";
import { setupBalls } from "./setupBalls.js";
import { dialogElement, state } from "./state.js";
import { drawTable } from "./table.js";

drawTable();

const controller = new Controller();

setupBalls();
Ball.drawAll();

function loop() {
    clearCanvas();
    Ball.updateAll();
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
