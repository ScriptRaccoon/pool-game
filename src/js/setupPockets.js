import { canvas, margin } from "./canvas.js";
import { Pocket } from "./Pocket.js";

export function setupPockets() {
    new Pocket({
        pos: {
            x: margin + Pocket.cornerOffset,
            y: margin + Pocket.cornerOffset,
        },
        type: "corner",
        rotation: 0,
    });
    new Pocket({
        pos: { x: canvas.width / 2, y: margin },
        type: "edge",
        rotation: 0,
    });
    new Pocket({
        pos: {
            x: canvas.width - margin - Pocket.cornerOffset,
            y: margin + Pocket.cornerOffset,
        },
        type: "corner",
        rotation: 90,
    });
    new Pocket({
        pos: {
            x: canvas.width - margin - Pocket.cornerOffset,
            y: canvas.height - margin - Pocket.cornerOffset,
        },
        type: "corner",
        rotation: 180,
    });
    new Pocket({
        pos: { x: canvas.width / 2, y: canvas.height - margin },
        type: "edge",
        rotation: 180,
    });
    new Pocket({
        pos: {
            x: margin + Pocket.cornerOffset,
            y: canvas.height - margin - Pocket.cornerOffset,
        },
        type: "corner",
        rotation: -90,
    });
}
