import { norm } from "./utils.js";

/** @type {HTMLCanvasElement} */
export const canvas = document.querySelector("canvas");
export const ctx = canvas.getContext("2d");

canvas.width = 1200;
canvas.height = 600;

export const canvasNorm = norm({ x: canvas.width, y: canvas.height });

export function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
