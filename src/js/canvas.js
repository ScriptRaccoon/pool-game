import { norm } from "./math.js";

/** @type {HTMLCanvasElement} */
export const canvas = document.getElementById("canvas");
/** @type {HTMLCanvasElement} */
export const tableCanvas = document.getElementById("tableCanvas");

export const ctx = canvas.getContext("2d");
export const tctx = tableCanvas.getContext("2d");

export const margin = 60;

canvas.width = 1200 + 2 * margin;
canvas.height = 600 + 2 * margin;
tableCanvas.width = 1200 + 2 * margin;
tableCanvas.height = 600 + 2 * margin;

export const canvasNorm = norm({ x: canvas.width, y: canvas.height });

export function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
