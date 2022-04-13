import { canvas, tctx, margin } from "./canvas.js";
import { Pocket } from "./Pocket.js";
import { Polygon } from "./Polygon.js";
import { setupPockets } from "./setupPockets.js";
import { pocketSize, setupPolygons } from "./setupPolygons.js";

export function drawTable() {
    drawCloth();
    drawWood();
    setupPockets();
    Pocket.drawAll();
    setupPolygons();
    Polygon.drawAll();
    drawMountings();
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

function drawMountings() {
    tctx.save();
    const width = 10;
    tctx.lineWidth = width;
    tctx.strokeStyle = "rgb(230,180,0)";
    tctx.lineCap = "round";
    const overflow = 50;
    const d = 0.04;
    const d2 = 0.16;
    const grace = 10;
    const cornerOffset = 12;
    tctx.shadowBlur = 10;
    tctx.shadowColor = "rgb(255,200,0,0.25)";

    // mounting top left
    tctx.beginPath();
    tctx.moveTo(
        margin - width / 2,
        margin + pocketSize + overflow + grace
    );
    tctx.arc(
        margin + cornerOffset,
        margin + cornerOffset,
        pocketSize + width / 2,
        (0.5 + d2) * Math.PI,
        (2 - d2) * Math.PI
    );
    tctx.lineTo(
        margin + pocketSize + overflow + grace,
        margin - width / 2
    );
    tctx.stroke();
    tctx.closePath();

    // mounting bottom left
    tctx.beginPath();
    tctx.moveTo(
        margin - width / 2,
        canvas.height - (margin + pocketSize + overflow + grace)
    );
    tctx.arc(
        margin + cornerOffset,
        canvas.height - margin - cornerOffset,
        pocketSize + width / 2,
        (1.5 - d2) * Math.PI,
        d2 * Math.PI,
        true
    );
    tctx.lineTo(
        margin + pocketSize + overflow + grace,
        canvas.height - margin + width / 2
    );
    tctx.stroke();
    tctx.closePath();

    // mounting top middle
    tctx.beginPath();
    tctx.moveTo(
        canvas.width / 2 - pocketSize - overflow,
        margin - width / 2
    );
    tctx.arc(
        canvas.width / 2,
        margin,
        pocketSize + width / 2,
        (1 + d) * Math.PI,
        (2 - d) * Math.PI
    );
    tctx.lineTo(
        canvas.width / 2 + pocketSize + overflow,
        margin - width / 2
    );
    tctx.stroke();
    tctx.closePath();

    // mounting bottom middle
    tctx.beginPath();
    tctx.moveTo(
        canvas.width / 2 - pocketSize - overflow,
        canvas.height - (margin - width / 2)
    );
    tctx.arc(
        canvas.width / 2,
        canvas.height - margin,
        pocketSize + width / 2,
        (-1 - d) * Math.PI,
        d * Math.PI,
        true
    );
    tctx.lineTo(
        canvas.width / 2 + pocketSize + overflow,
        canvas.height - (margin - width / 2)
    );
    tctx.stroke();
    tctx.closePath();

    // mounting top right
    tctx.beginPath();
    tctx.moveTo(
        canvas.width - (margin - width / 2),
        margin + pocketSize + overflow + grace
    );
    tctx.arc(
        canvas.width - margin - cornerOffset,
        margin + cornerOffset,
        pocketSize + width / 2,
        (2.5 - d2) * Math.PI,
        (1 + d2) * Math.PI,
        true
    );
    tctx.lineTo(
        canvas.width - (margin + pocketSize + overflow + grace),
        margin - width / 2
    );
    tctx.stroke();
    tctx.closePath();

    // mounting bottom right
    tctx.beginPath();
    tctx.moveTo(
        canvas.width - (margin - width / 2),
        canvas.height - (margin + pocketSize + overflow + grace)
    );
    tctx.arc(
        canvas.width - margin - cornerOffset,
        canvas.height - margin - cornerOffset,
        pocketSize + width / 2,
        (-0.5 + d2) * Math.PI,
        (1 - d2) * Math.PI
    );
    tctx.lineTo(
        canvas.width - (margin + pocketSize + overflow + grace),
        canvas.height - margin + width / 2
    );
    tctx.stroke();
    tctx.closePath();

    tctx.restore();
}
