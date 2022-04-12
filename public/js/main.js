import { Ball } from "./Ball.js";
import { clearCanvas } from "./canvas.js";
import { Controller } from "./Controller.js";
import { closeDialog } from "./dialog.js";
import { setupBalls } from "./setupBalls.js";
import { state } from "./state.js";
import { drawTable } from "./table.js";

drawTable();

const controller = new Controller();

setupBalls();
Ball.drawAll();

function loop() {
    clearCanvas();
    Ball.updateAll();
    Ball.drawAll();
    controller.update();
    controller.draw();
    requestAnimationFrame(loop);
}

loop();

document
    .getElementById("restartBtn")
    .addEventListener("click", restartGame);

function restartGame() {
    Ball.resetAll();
    closeDialog();
    state.won = null;
    state.playing = true;
}
