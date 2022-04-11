import { canvas, margin } from "./canvas.js";
import { Polygon } from "./Polygon.js";

const width = 20; // same as in drawPaddings

export const pocketSize = 30;

export function setupPolygons() {
    // top left
    new Polygon([
        { x: margin + pocketSize, y: margin },
        { x: margin + pocketSize + width, y: margin + width },
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
            x: margin + pocketSize + width,
            y: canvas.height - (margin + width),
        },
        { x: margin + pocketSize, y: canvas.height - margin },
    ]);

    // top right
    new Polygon([
        { x: canvas.width / 2 + pocketSize, y: margin },
        {
            x: canvas.width / 2 + pocketSize + width,
            y: margin + width,
        },
        {
            x: canvas.width - pocketSize - margin - width,
            y: margin + width,
        },
        { x: canvas.width - pocketSize - margin, y: margin },
    ]);

    // bottom right
    new Polygon([
        {
            x: canvas.width - pocketSize - margin,
            y: canvas.height - margin,
        },
        {
            x: canvas.width - pocketSize - margin - width,
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
        { x: margin, y: canvas.height - margin - pocketSize },
        {
            x: margin + width,
            y: canvas.height - margin - width - pocketSize,
        },
        { x: margin + width, y: margin + pocketSize + width },
        { x: margin, y: margin + pocketSize },
    ]);

    // side right
    new Polygon([
        { x: canvas.width - margin, y: margin + pocketSize },
        {
            x: canvas.width - (margin + width),
            y: margin + pocketSize + width,
        },
        {
            x: canvas.width - (margin + width),
            y: canvas.height - margin - width - pocketSize,
        },
        {
            x: canvas.width - margin,
            y: canvas.height - margin - pocketSize,
        },
    ]);
}
