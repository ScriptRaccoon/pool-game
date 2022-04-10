import { canvas, margin } from "./canvas.js";
import { Pocket } from "./Pocket.js";

export function setupPockets() {
    const positions = [
        { x: margin, y: margin },
        { x: canvas.width / 2, y: margin },
        { x: canvas.width - margin, y: margin },
        { x: margin, y: canvas.height - margin },
        { x: canvas.width / 2, y: canvas.height - margin },
        { x: canvas.width - margin, y: canvas.height - margin },
    ];

    positions.forEach((pos) => {
        new Pocket({ pos });
    });
}
