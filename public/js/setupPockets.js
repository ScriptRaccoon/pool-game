import { canvas } from "./canvas.js";
import { Pocket } from "./Pocket.js";

export function setupPockets() {
    const edgeOffset = 3;
    const sideOffset = 8;

    new Pocket({ pos: { x: edgeOffset, y: edgeOffset } });
    new Pocket({ pos: { x: canvas.height, y: -sideOffset } });
    new Pocket({
        pos: { x: canvas.width - edgeOffset, y: edgeOffset },
    });
    new Pocket({
        pos: {
            x: canvas.width - edgeOffset,
            y: canvas.height - edgeOffset,
        },
    });
    new Pocket({
        pos: { x: canvas.height, y: canvas.height + sideOffset },
    });
    new Pocket({
        pos: { x: edgeOffset, y: canvas.height - edgeOffset },
    });
}
