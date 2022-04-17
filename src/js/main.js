import { clearCanvas } from "./canvas.js";
import { drawTable } from "./table.js";
import { game } from "./setupGame.js";

drawTable(game);

function loop() {
    clearCanvas();
    game.update();
    game.draw();
    requestAnimationFrame(loop);
}

loop();
