import { clearCanvas } from "./canvas.js";
import { game } from "./setupGame.js";

game.drawTable();

function loop() {
    clearCanvas();
    game.update();
    game.draw();
    requestAnimationFrame(loop);
}

loop();
