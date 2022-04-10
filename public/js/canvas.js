/** @type {HTMLCanvasElement} */
export const canvas = document.querySelector("canvas");
export const ctx = canvas.getContext("2d");

function makeCanvasFullscreen() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", makeCanvasFullscreen);

makeCanvasFullscreen();

export function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
