import { norm } from "./math.js";

// canvas for drawing the balls
/** @type {HTMLCanvasElement} */
export const canvas = document.getElementById("canvas");

// canvas for drawing the table
/** @type {HTMLCanvasElement} */
const tableCanvas = document.getElementById("tableCanvas");

export const ctx = canvas.getContext("2d");
export const tctx = tableCanvas.getContext("2d");

// wood margin
export const margin = 60;

// set up dimensions
canvas.width = tableCanvas.width = 1200 + 2 * margin;
canvas.height = tableCanvas.height = 600 + 2 * margin;

export const canvasNorm = norm({ x: canvas.width, y: canvas.height });

export function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
