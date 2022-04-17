import { canvas, margin } from "./canvas.js";
import { Pocket, cornerOffset } from "./Pocket.js";

export function getPockets() {
    return [
        new Pocket({
            pos: {
                x: margin + cornerOffset,
                y: margin + cornerOffset,
            },
            type: "corner",
            rotation: 0,
        }),
        new Pocket({
            pos: { x: canvas.width / 2, y: margin },
            type: "edge",
            rotation: 0,
        }),
        new Pocket({
            pos: {
                x: canvas.width - margin - cornerOffset,
                y: margin + cornerOffset,
            },
            type: "corner",
            rotation: 90,
        }),
        new Pocket({
            pos: {
                x: canvas.width - margin - cornerOffset,
                y: canvas.height - margin - cornerOffset,
            },
            type: "corner",
            rotation: 180,
        }),
        new Pocket({
            pos: { x: canvas.width / 2, y: canvas.height - margin },
            type: "edge",
            rotation: 180,
        }),
        new Pocket({
            pos: {
                x: margin + cornerOffset,
                y: canvas.height - margin - cornerOffset,
            },
            type: "corner",
            rotation: -90,
        }),
    ];
}
