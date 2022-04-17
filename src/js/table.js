import { canvas, tctx, margin } from "./canvas.js";

export function drawCloth() {
    tctx.fillStyle = "rgb(26, 130, 30)";
    tctx.fillRect(0, 0, canvas.width, canvas.height);
}

export function drawWood() {
    let gradient;
    function setupGradient() {
        gradient.addColorStop(0, "hsl(16, 76%, 15%)");
        gradient.addColorStop(1, "hsl(16, 76%, 30%)");
        tctx.fillStyle = gradient;
    }

    // wood top left corner
    gradient = tctx.createRadialGradient(
        margin,
        margin,
        margin,
        margin,
        margin,
        0
    );
    setupGradient();
    tctx.fillRect(0, 0, margin, margin);

    // wood top right corner
    gradient = tctx.createRadialGradient(
        canvas.width - margin,
        margin,
        margin,
        canvas.width - margin,
        margin,
        0
    );
    setupGradient();
    tctx.fillRect(canvas.width - margin, 0, margin, margin);

    // wood bottom left corner
    gradient = tctx.createRadialGradient(
        margin,
        canvas.height - margin,
        margin,
        margin,
        canvas.height - margin,
        0
    );
    setupGradient();
    tctx.fillRect(0, canvas.height - margin, margin, margin);

    // wood bottom right corner
    gradient = tctx.createRadialGradient(
        canvas.width - margin,
        canvas.height - margin,
        margin,
        canvas.width - margin,
        canvas.height - margin,
        0
    );
    setupGradient();
    tctx.fillRect(
        canvas.width - margin,
        canvas.height - margin,
        margin,
        margin
    );

    // wood top side
    gradient = tctx.createLinearGradient(0, 0, 0, margin);
    setupGradient();
    tctx.fillRect(margin, 0, canvas.width - 2 * margin, margin);

    // wood bottom side
    gradient = tctx.createLinearGradient(
        0,
        canvas.height,
        0,
        canvas.height - margin
    );
    setupGradient();
    tctx.fillRect(
        margin,
        canvas.height - margin,
        canvas.width - 2 * margin,
        margin
    );

    // wood left side
    gradient = tctx.createLinearGradient(0, 0, margin, 0);
    setupGradient();
    tctx.fillRect(0, margin, margin, canvas.height - 2 * margin);

    // wood right side
    gradient = tctx.createLinearGradient(
        canvas.width,
        0,
        canvas.width - margin,
        0
    );
    setupGradient();
    tctx.fillRect(
        canvas.width - margin,
        margin,
        canvas.width,
        canvas.height - 2 * margin
    );
}
