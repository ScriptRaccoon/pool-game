import { Ball } from "./Ball.js";

import { clearCanvas } from "./canvas.js";
import { setupBalls } from "./setupBalls.js";

function loop() {
    clearCanvas();
    Ball.list.forEach((b) => b.update());
    Ball.list.forEach((b) => b.draw());
    requestAnimationFrame(loop);
}

setupBalls();

document.addEventListener("click", loop);
