import { Ball } from "./Ball.js";
import { clearCanvas } from "./canvas.js";

import { Controller } from "./Controller.js";
import { Polygon } from "./Polygon.js";
import { Pocket } from "./Pocket.js";
import { setupBalls } from "./setupBalls.js";
import { setupPockets } from "./setupPockets.js";
import { dialogElement, state } from "./state.js";
import { drawTable } from "./table.js";
import { setupPolygons } from "./setupPolygons.js";

const controller = new Controller();

setupPockets();
setupBalls();
setupPolygons();

Pocket.drawAll();
Ball.drawAll();
Polygon.drawAll();

function loop() {
    clearCanvas();
    drawTable();
    Pocket.drawAll();
    Polygon.drawAll();
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
