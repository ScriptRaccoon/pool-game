import { canvas, margin } from "./canvas.js";
import { Polygon } from "./Polygon.js";

const width = 20;
const grace = 20;

export const pocketSize = 30;

export function setupPolygons() {
    // top left
    new Polygon([
        { x: margin + pocketSize + grace, y: margin },
        { x: margin + pocketSize + width + grace, y: margin + width },
        {
            x: canvas.width / 2 - pocketSize - width,
            y: margin + width,
        },
        { x: canvas.width / 2 - pocketSize, y: margin },
    ]);

    // bottom left
    new Polygon([
        {
            x: canvas.width / 2 - pocketSize,
            y: canvas.height - margin,
        },
        {
            x: canvas.width / 2 - pocketSize - width,
            y: canvas.height - (margin + width),
        },

        {
            x: margin + pocketSize + width + grace,
            y: canvas.height - (margin + width),
        },
        { x: margin + pocketSize + grace, y: canvas.height - margin },
    ]);

    // top right
    new Polygon([
        { x: canvas.width / 2 + pocketSize, y: margin },
        {
            x: canvas.width / 2 + pocketSize + width,
            y: margin + width,
        },
        {
            x: canvas.width - pocketSize - margin - width - grace,
            y: margin + width,
        },
        { x: canvas.width - pocketSize - margin - grace, y: margin },
    ]);

    // bottom right
    new Polygon([
        {
            x: canvas.width - pocketSize - margin - grace,
            y: canvas.height - margin,
        },
        {
            x: canvas.width - pocketSize - margin - width - grace,
            y: canvas.height - (margin + width),
        },

        {
            x: canvas.width / 2 + pocketSize + width,
            y: canvas.height - (margin + width),
        },
        {
            x: canvas.width / 2 + pocketSize,
            y: canvas.height - margin,
        },
    ]);

    // side left
    new Polygon([
        { x: margin, y: canvas.height - margin - pocketSize - grace },
        {
            x: margin + width,
            y: canvas.height - margin - width - pocketSize - grace,
        },
        { x: margin + width, y: margin + pocketSize + width + grace },
        { x: margin, y: margin + pocketSize + grace },
    ]);

    // side right
    new Polygon([
        { x: canvas.width - margin, y: margin + pocketSize + grace },
        {
            x: canvas.width - (margin + width),
            y: margin + pocketSize + width + grace,
        },
        {
            x: canvas.width - (margin + width),
            y: canvas.height - margin - width - pocketSize - grace,
        },
        {
            x: canvas.width - margin,
            y: canvas.height - margin - pocketSize - grace,
        },
    ]);
}
