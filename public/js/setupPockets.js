import { canvas, margin } from "./canvas.js";
import { Pocket } from "./Pocket.js";

export function setupPockets() {
    const cornerOffset = 12;
    const positions = [
        { x: margin + cornerOffset, y: margin + cornerOffset },
        { x: canvas.width / 2, y: margin },
        {
            x: canvas.width - margin - cornerOffset,
            y: margin + cornerOffset,
        },
        {
            x: margin + cornerOffset,
            y: canvas.height - margin - cornerOffset,
        },
        { x: canvas.width / 2, y: canvas.height - margin },
        {
            x: canvas.width - margin - cornerOffset,
            y: canvas.height - margin - cornerOffset,
        },
    ];

    positions.forEach((pos) => {
        new Pocket({ pos });
    });
}
