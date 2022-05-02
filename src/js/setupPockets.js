import { canvas, margin } from "./canvas.js";
import { Pocket, cornerOffset } from "./Pocket.js";

export function getPockets() {
    return [
        // top left
        new Pocket({
            pos: {
                x: margin + cornerOffset,
                y: margin + cornerOffset,
            },
            type: "corner",
            rotation: 0,
        }),
        // top middle
        new Pocket({
            pos: { x: canvas.width / 2, y: margin },
            type: "edge",
            rotation: 0,
        }),
        // top right
        new Pocket({
            pos: {
                x: canvas.width - margin - cornerOffset,
                y: margin + cornerOffset,
            },
            type: "corner",
            rotation: 90,
        }),
        // bottom left
        new Pocket({
            pos: {
                x: margin + cornerOffset,
                y: canvas.height - margin - cornerOffset,
            },
            type: "corner",
            rotation: -90,
        }),

        // bottom middle
        new Pocket({
            pos: { x: canvas.width / 2, y: canvas.height - margin },
            type: "edge",
            rotation: 180,
        }),
        // bottom right
        new Pocket({
            pos: {
                x: canvas.width - margin - cornerOffset,
                y: canvas.height - margin - cornerOffset,
            },
            type: "corner",
            rotation: 180,
        }),
    ];
}
