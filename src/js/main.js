import { clearCanvas } from "./canvas.js";
import { openDialog } from "./dialog.js";
import { game } from "./setupGame.js";

game.drawTable();

function loop() {
    clearCanvas();
    game.update();
    game.draw();
    requestAnimationFrame(loop);
}

loop();

setTimeout(() => {
    openDialog(
        "Use your mouse to control the white ball.<br>" +
            "Try to pocket every other ball with it.<br>" +
            "The black ball has to be the last one."
    );
}, 500);
