import { Ball } from "./Ball.js";
import { clearCanvas } from "./canvas.js";

import { Controller } from "./Controller.js";
import { Line } from "./Line.js";
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

new Line({ start: { x: 600, y: 160 }, end: { x: 400, y: 350 } });

function loop() {
    clearCanvas();
    drawTable();
    Line.list.forEach((l) => l.draw());
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
