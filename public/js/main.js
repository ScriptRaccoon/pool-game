import { Ball } from "./Ball.js";

import { clearCanvas } from "./canvas.js";

new Ball({
    pos: { x: 100, y: 100 },
    vel: { x: 20, y: 5.1 },
    color: "darkred",
});

new Ball({
    pos: { x: 500, y: 190 },
    vel: { x: 0, y: 0 },
    color: "skyblue",
});

new Ball({
    pos: { x: 700, y: 300 },
    vel: { x: 0, y: 0 },
    color: "orange",
});

new Ball({
    pos: { x: 1000, y: 100 },
    vel: { x: 0, y: 0 },
    color: "blue",
});

new Ball({
    pos: { x: 400, y: 360 },
    vel: { x: 0, y: 0 },
    color: "purple",
});

function loop() {
    clearCanvas();
    Ball.list.forEach((b) => b.update());
    Ball.list.forEach((b) => b.draw());
    requestAnimationFrame(loop);
}

Ball.list.forEach((b) => b.draw());

document.addEventListener("click", loop);
