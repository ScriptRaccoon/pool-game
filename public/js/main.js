import { Ball } from "./Ball.js";

import { clearCanvas } from "./canvas.js";
import { Controller } from "./Controller.js";
import { Pocket } from "./Pocket.js";
import { setupBalls } from "./setupBalls.js";
import { setupPockets } from "./setupPockets.js";
import { dialogElement, state, writeStatus } from "./state.js";

const controller = new Controller();

setupPockets();
setupBalls();

Pocket.drawAll();
Ball.drawAll();

function loop() {
    console.log(state.playing);
    clearCanvas();
    Ball.updateAll();
    Pocket.drawAll();
    Ball.drawAll();
    controller.active = Ball.idle && state.playing;
    controller.draw();
    requestAnimationFrame(loop);
}

function init() {
    writeStatus("Click here to start the game");
    dialogElement.addEventListener("click", () => {
        if (!state.started) {
            state.started = true;
            state.playing = true;
            loop();
        }
    });
}

init();
