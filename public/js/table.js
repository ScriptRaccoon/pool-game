import { canvas, tctx, margin } from "./canvas.js";
import { Pocket } from "./Pocket.js";
import { Polygon } from "./Polygon.js";
import { setupPockets } from "./setupPockets.js";
import { pocketSize, setupPolygons } from "./setupPolygons.js";

export function drawTable() {
    drawCloth();
    drawWood();
    drawMountings();
    setupPockets();
    Pocket.drawAll();
    setupPolygons();
    Polygon.drawAll();
}

function drawCloth() {
    tctx.fillStyle = "rgb(26, 130, 30)";
    tctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawWood() {
    let gradient;
    function setupGradient() {
        gradient.addColorStop(0, "hsl(16, 76%, 15%)");
        gradient.addColorStop(1, "hsl(16, 76%, 30%)");
        tctx.fillStyle = gradient;
    }
    // top left corner
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
    // top right corner
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
    // bottom left corner
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
    // bottom right corner
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
    // top side
    gradient = tctx.createLinearGradient(0, 0, 0, margin);
    setupGradient();

    tctx.fillRect(margin, 0, canvas.width - 2 * margin, margin);
    // bottom side
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
    // left side
    gradient = tctx.createLinearGradient(0, 0, margin, 0);
    setupGradient();

    tctx.fillRect(0, margin, margin, canvas.height - 2 * margin);
    // right side
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

function drawMountings() {
    const width = 10;
    tctx.lineWidth = width;
    tctx.strokeStyle = "orange";

    // round parts

    tctx.lineCap = "butt";
    const d = 0.05;

    // rounding top left
    tctx.beginPath();
    tctx.arc(
        margin,
        margin,
        pocketSize + width / 2,
        (0.5 + d) * Math.PI,
        (2 - d) * Math.PI
    );
    tctx.stroke();
    tctx.closePath();

    // rounding bottom left
    tctx.beginPath();
    tctx.arc(
        margin,
        canvas.height - margin,
        pocketSize + width / 2,
        d * Math.PI,
        (1.5 - d) * Math.PI
    );
    tctx.stroke();
    tctx.closePath();

    // rounding top middle
    tctx.beginPath();
    tctx.arc(
        canvas.width / 2,
        margin,
        pocketSize + width / 2,
        (1 + d) * Math.PI,
        (2 - d) * Math.PI
    );
    tctx.stroke();
    tctx.closePath();

    // rounding bottom middle
    tctx.beginPath();
    tctx.arc(
        canvas.width / 2,
        canvas.height - margin,
        pocketSize + width / 2,
        d * Math.PI,
        (-1 - d) * Math.PI
    );
    tctx.stroke();
    tctx.closePath();

    // rounding top right
    tctx.beginPath();
    tctx.arc(
        canvas.width - margin,
        margin,
        pocketSize + width / 2,
        (1 + d) * Math.PI,
        (2.5 - d) * Math.PI
    );
    tctx.stroke();
    tctx.closePath();

    // rounding bottom right
    tctx.beginPath();
    tctx.arc(
        canvas.width - margin,
        canvas.height - margin,
        pocketSize + width / 2,
        (-0.5 + d) * Math.PI,
        (1 - d) * Math.PI
    );
    tctx.stroke();
    tctx.closePath();

    // lines

    const overflow = 50;
    tctx.lineCap = "round";

    // lines top left
    tctx.beginPath();
    tctx.moveTo(margin - width / 2, margin + pocketSize + overflow);
    tctx.lineTo(margin - width / 2, margin + pocketSize);
    tctx.stroke();
    tctx.moveTo(margin + pocketSize, margin - width / 2);
    tctx.lineTo(margin + pocketSize + overflow, margin - width / 2);
    tctx.stroke();
    tctx.closePath();

    // lines bottom left
    tctx.beginPath();
    tctx.moveTo(
        margin - width / 2,
        canvas.height - (margin + pocketSize + overflow)
    );
    tctx.lineTo(
        margin - width / 2,
        canvas.height - (margin + pocketSize)
    );
    tctx.moveTo(
        margin + pocketSize,
        canvas.height - margin + width / 2
    );
    tctx.lineTo(
        margin + pocketSize + overflow,
        canvas.height - margin + width / 2
    );
    tctx.stroke();
    tctx.closePath();

    // lines top right
    tctx.beginPath();
    tctx.moveTo(
        canvas.width - (margin - width / 2),
        margin + pocketSize + overflow
    );
    tctx.lineTo(
        canvas.width - (margin - width / 2),
        margin + pocketSize
    );
    tctx.stroke();
    tctx.moveTo(
        canvas.width - (margin + pocketSize),
        margin - width / 2
    );
    tctx.lineTo(
        canvas.width - (margin + pocketSize + overflow),
        margin - width / 2
    );
    tctx.stroke();
    tctx.closePath();

    // lines bottom right
    tctx.beginPath();
    tctx.moveTo(
        canvas.width - (margin - width / 2),
        canvas.height - (margin + pocketSize + overflow)
    );
    tctx.lineTo(
        canvas.width - (margin - width / 2),
        canvas.height - (margin + pocketSize)
    );
    tctx.moveTo(
        canvas.width - (margin + pocketSize),
        canvas.height - margin + width / 2
    );
    tctx.lineTo(
        canvas.width - (margin + pocketSize + overflow),
        canvas.height - margin + width / 2
    );
    tctx.stroke();
    tctx.closePath();

    // lines top middle
    tctx.beginPath();
    tctx.moveTo(
        canvas.width / 2 - pocketSize - overflow,
        margin - width / 2
    );
    tctx.lineTo(canvas.width / 2 - pocketSize, margin - width / 2);
    tctx.stroke();
    tctx.moveTo(canvas.width / 2 + pocketSize, margin - width / 2);
    tctx.lineTo(
        canvas.width / 2 + pocketSize + overflow,
        margin - width / 2
    );
    tctx.stroke();
    tctx.closePath();

    // lines bottom middle
    tctx.beginPath();
    tctx.moveTo(
        canvas.width / 2 - pocketSize - overflow,
        canvas.height - (margin - width / 2)
    );
    tctx.lineTo(
        canvas.width / 2 - pocketSize,
        canvas.height - (margin - width / 2)
    );
    tctx.stroke();
    tctx.moveTo(
        canvas.width / 2 + pocketSize,
        canvas.height - (margin - width / 2)
    );
    tctx.lineTo(
        canvas.width / 2 + pocketSize + overflow,
        canvas.height - (margin - width / 2)
    );
    tctx.stroke();
    tctx.closePath();
}
