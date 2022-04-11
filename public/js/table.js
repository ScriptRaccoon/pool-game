import { canvas, canvasNorm, ctx, margin } from "./canvas.js";
import { pocketSize } from "./setupPolygons.js";

export function drawTable() {
    drawWood();
    drawMountings();
}

function drawWood() {
    let gradient;
    function setupGradient() {
        gradient.addColorStop(0, "hsl(16, 76%, 10%)");
        gradient.addColorStop(1, "hsl(16, 76%, 30%)");
        ctx.fillStyle = gradient;
    }
    // top left corner
    gradient = ctx.createRadialGradient(
        margin,
        margin,
        margin,
        margin,
        margin,
        0
    );
    setupGradient();
    ctx.fillRect(0, 0, margin, margin);
    // top right corner
    gradient = ctx.createRadialGradient(
        canvas.width - margin,
        margin,
        margin,
        canvas.width - margin,
        margin,
        0
    );
    setupGradient();
    ctx.fillRect(canvas.width - margin, 0, margin, margin);
    // bottom left corner
    gradient = ctx.createRadialGradient(
        margin,
        canvas.height - margin,
        margin,
        margin,
        canvas.height - margin,
        0
    );
    setupGradient();
    ctx.fillRect(0, canvas.height - margin, margin, margin);
    // bottom right corner
    gradient = ctx.createRadialGradient(
        canvas.width - margin,
        canvas.height - margin,
        margin,
        canvas.width - margin,
        canvas.height - margin,
        0
    );
    setupGradient();
    ctx.fillRect(
        canvas.width - margin,
        canvas.height - margin,
        margin,
        margin
    );
    // top side
    gradient = ctx.createLinearGradient(0, 0, 0, margin);
    setupGradient();

    ctx.fillRect(margin, 0, canvas.width - 2 * margin, margin);
    // bottom side
    gradient = ctx.createLinearGradient(
        0,
        canvas.height,
        0,
        canvas.height - margin
    );
    setupGradient();

    ctx.fillRect(
        margin,
        canvas.height - margin,
        canvas.width - 2 * margin,
        margin
    );
    // left side
    gradient = ctx.createLinearGradient(0, 0, margin, 0);
    setupGradient();

    ctx.fillRect(0, margin, margin, canvas.height - 2 * margin);
    // right side
    gradient = ctx.createLinearGradient(
        canvas.width,
        0,
        canvas.width - margin,
        0
    );
    setupGradient();

    ctx.fillRect(
        canvas.width - margin,
        margin,
        canvas.width,
        canvas.height - 2 * margin
    );
}

function drawMountings() {
    const width = 10;
    ctx.lineWidth = width;
    ctx.strokeStyle = "orange";

    // round parts

    ctx.lineCap = "butt";
    const d = 0.05;

    // rounding top left
    ctx.beginPath();
    ctx.arc(
        margin,
        margin,
        pocketSize + width / 2,
        (0.5 + d) * Math.PI,
        (2 - d) * Math.PI
    );
    ctx.stroke();
    ctx.closePath();

    // rounding bottom left
    ctx.beginPath();
    ctx.arc(
        margin,
        canvas.height - margin,
        pocketSize + width / 2,
        d * Math.PI,
        (1.5 - d) * Math.PI
    );
    ctx.stroke();
    ctx.closePath();

    // rounding top middle
    ctx.beginPath();
    ctx.arc(
        canvas.width / 2,
        margin,
        pocketSize + width / 2,
        (1 + d) * Math.PI,
        (2 - d) * Math.PI
    );
    ctx.stroke();
    ctx.closePath();

    // rounding bottom middle
    ctx.beginPath();
    ctx.arc(
        canvas.width / 2,
        canvas.height - margin,
        pocketSize + width / 2,
        d * Math.PI,
        (-1 - d) * Math.PI
    );
    ctx.stroke();
    ctx.closePath();

    // rounding top right
    ctx.beginPath();
    ctx.arc(
        canvas.width - margin,
        margin,
        pocketSize + width / 2,
        (1 + d) * Math.PI,
        (2.5 - d) * Math.PI
    );
    ctx.stroke();
    ctx.closePath();

    // rounding bottom right
    ctx.beginPath();
    ctx.arc(
        canvas.width - margin,
        canvas.height - margin,
        pocketSize + width / 2,
        (-0.5 + d) * Math.PI,
        (1 - d) * Math.PI
    );
    ctx.stroke();
    ctx.closePath();

    // lines

    const overflow = 50;
    ctx.lineCap = "round";

    // lines top left
    ctx.beginPath();
    ctx.moveTo(margin - width / 2, margin + pocketSize + overflow);
    ctx.lineTo(margin - width / 2, margin + pocketSize);
    ctx.stroke();
    ctx.moveTo(margin + pocketSize, margin - width / 2);
    ctx.lineTo(margin + pocketSize + overflow, margin - width / 2);
    ctx.stroke();
    ctx.closePath();

    // lines bottom left
    ctx.beginPath();
    ctx.moveTo(
        margin - width / 2,
        canvas.height - (margin + pocketSize + overflow)
    );
    ctx.lineTo(
        margin - width / 2,
        canvas.height - (margin + pocketSize)
    );
    ctx.moveTo(
        margin + pocketSize,
        canvas.height - margin + width / 2
    );
    ctx.lineTo(
        margin + pocketSize + overflow,
        canvas.height - margin + width / 2
    );
    ctx.stroke();
    ctx.closePath();

    // lines top right
    ctx.beginPath();
    ctx.moveTo(
        canvas.width - (margin - width / 2),
        margin + pocketSize + overflow
    );
    ctx.lineTo(
        canvas.width - (margin - width / 2),
        margin + pocketSize
    );
    ctx.stroke();
    ctx.moveTo(
        canvas.width - (margin + pocketSize),
        margin - width / 2
    );
    ctx.lineTo(
        canvas.width - (margin + pocketSize + overflow),
        margin - width / 2
    );
    ctx.stroke();
    ctx.closePath();

    // lines bottom right
    ctx.beginPath();
    ctx.moveTo(
        canvas.width - (margin - width / 2),
        canvas.height - (margin + pocketSize + overflow)
    );
    ctx.lineTo(
        canvas.width - (margin - width / 2),
        canvas.height - (margin + pocketSize)
    );
    ctx.moveTo(
        canvas.width - (margin + pocketSize),
        canvas.height - margin + width / 2
    );
    ctx.lineTo(
        canvas.width - (margin + pocketSize + overflow),
        canvas.height - margin + width / 2
    );
    ctx.stroke();
    ctx.closePath();

    // lines top middle
    ctx.beginPath();
    ctx.moveTo(
        canvas.width / 2 - pocketSize - overflow,
        margin - width / 2
    );
    ctx.lineTo(canvas.width / 2 - pocketSize, margin - width / 2);
    ctx.stroke();
    ctx.moveTo(canvas.width / 2 + pocketSize, margin - width / 2);
    ctx.lineTo(
        canvas.width / 2 + pocketSize + overflow,
        margin - width / 2
    );
    ctx.stroke();
    ctx.closePath();

    // lines bottom middle
    ctx.beginPath();
    ctx.moveTo(
        canvas.width / 2 - pocketSize - overflow,
        canvas.height - (margin - width / 2)
    );
    ctx.lineTo(
        canvas.width / 2 - pocketSize,
        canvas.height - (margin - width / 2)
    );
    ctx.stroke();
    ctx.moveTo(
        canvas.width / 2 + pocketSize,
        canvas.height - (margin - width / 2)
    );
    ctx.lineTo(
        canvas.width / 2 + pocketSize + overflow,
        canvas.height - (margin - width / 2)
    );
    ctx.stroke();
    ctx.closePath();
}
